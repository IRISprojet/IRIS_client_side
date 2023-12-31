import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import * as yup from 'yup';
import format from 'date-fns/format';
import { useDispatch } from 'react-redux';
import NoteFormList from './tasks/NoteFormList';
import NoteFormLabelMenu from './NoteFormLabelMenu';
import NoteFormReminder from './NoteFormReminder';
import NoteFormUploadImage from './NoteFormUploadImage';
import NoteModel from '../model/NoteModel';
import NoteReminderLabel from '../NoteReminderLabel';
import NoteLabel from '../NoteLabel';
import axios from 'axios';
import { useRef } from 'react';
import { Slice, updateNote } from '../../notes/store/notesSlice';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string(),
  content: yup.string(),
  image: yup.mixed().test('fileType', 'Unsupported File Type', (value) => {
    if (value && value.length) {
      const file = value[0];
      const supportedTypes = ['image/jpeg', 'image/png'];
      return supportedTypes.includes(file.type);
    }
    return true;
  }),

  tasks: yup.array(),
  oneOfThemRequired: yup.bool().when(['title', 'content', 'image', 'tasks'], {
    is: (a, b, c, d) => (!a && !b && !c && !d) || (!!a && !!b && !!c && !!d),
    then: yup.bool().required(''),
    otherwise: yup.bool(),
  }),
});

function NoteForm(props) {
  const [showList, setShowList] = useState(false);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);


  const [imagePreview, setImagePreview] = useState(null);


  const defaultValues = _.merge(
    {},
    NoteModel(),
    props.note,
    routeParams.labelId ? { labels: [routeParams.labelId] } : null,
    routeParams.id === 'archive' ? { archived: true } : null
  );
  const { formState, handleSubmit, getValues, reset, watch, setValue, control } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const noteForm = watch();

  /**
   * Update Note
   */


  const [modifiedNote, setModifiedNote] = useState(null);

  useEffect(() => {
    if (!props.note || props.variant === 'new' || !props.onChange) {
      return;
    }

    const noteChanged = !_.isEqual(props.note, modifiedNote);

    if (noteChanged) {
      setModifiedNote(noteForm);
      props.onChange(noteForm);
    }
  }, [noteForm, props]);
  useEffect(() => {
    if (noteForm.image && noteForm.image !== '') {
      setImagePreview(noteForm.image);
      console.log(noteForm.image);
    } else {
      setImagePreview(null);
    }
  }, [noteForm.image]);


  function handleRemoveLabel(id) {
    setValue(
      'labels',
      noteForm.labels.filter((_id) => _id !== id)
    );
  }



  /**
   * Create New Note
   */
  async function onCreate() {
    if (!props.onCreate) {
      return;
    }

    const data = getValues(); // Récupère les valeurs du formulaire

    if (props.variant === 'new') {
      // Création d'une nouvelle note
      props.onCreate(data);
      reset(); // Réinitialise le formulaire après la création
    } else {
      // Mise à jour d'une note existante
      try {
        await dispatch(updateNote(data)); // Appel à la fonction updateNote avec les nouvelles données de la note
      } catch (error) {
        // Gérer les erreurs éventuelles
      }
    }

    // Réinitialisez le champ de fichier
    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  }




  return (

    <div className="flex flex-col w-full">

      <FuseScrollbars className="flex flex-auto w-full max-h-640">

        <div className="w-full">

          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => {
              return (
                <div className="relative">
                  {value && (
                    <img
                      src={value instanceof File ? URL.createObjectURL(value) : value}
                      style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '350px' }}
                      alt="note"
                    />
                  )}

                  <Fab
                    className="absolute right-0 bottom-0 m-8"
                    variant="extended"
                    size="small"
                    color="secondary"
                    aria-label="Delete Image"
                    type="button"
                    onClick={() => {
                      onChange(null);
                      // Réinitialisez le champ de fichier
                      if (imageInputRef.current) {
                        imageInputRef.current.value = null;
                      }
                    }}
                  >
                    <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                  </Fab>
                </div>
              );
            }}
          />

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              setValue('image', file);
            }}
          />



          <div className="px-20 my-16">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="font-semibold text-14"
                  placeholder="Title"
                  type="text"
                  disableUnderline
                  fullWidth
                />
              )}
            />
          </div>
          <div className="px-20 my-16">
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Take a note..."
                  multiline
                  rows="4"
                  disableUnderline
                  fullWidth
                />
              )}
            />
          </div>

          <Controller
            name="tasks"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              if ((value?.length === 0 && !showList) || (!value && !showList)) {
                return null;
              }
              return (
                <div className="px-16">
                  <NoteFormList tasks={value || []} onCheckListChange={(val) => onChange(val)} />
                </div>
              );
            }}
          />

          {(noteForm.labels || noteForm.reminder || noteForm.createdAt) && (
            <div className="flex flex-wrap w-full px-20 my-16 -mx-4">
              {noteForm.reminder && (
                <NoteReminderLabel
                  className="mt-4 mx-4"
                  date={noteForm.reminder}
                  onDelete={() => {
                    setValue('reminder', null);
                  }}
                />
              )}

              <Controller
                name="labels"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => {
                  if (!value) {
                    return null;
                  }
                  return value.map((id) => (
                    <NoteLabel
                      id={id}
                      key={id}
                      className="mt-4 mx-4"
                      onDelete={() => onChange(value.filter((_id) => _id !== id))}
                    />
                  ));
                }}
              />

              {noteForm.createdAt && (
                <Typography color="text.secondary" className="text-12 mt-8 mx-4">
                  Edited: {format(new Date(noteForm.createdAt), 'MMM dd yy, h:mm')}
                </Typography>
              )}
            </div>
          )}
        </div>
      </FuseScrollbars>

      <div className="flex flex-auto justify-between items-center px-16 pb-12">
        <div className="flex items-center">
          <Tooltip title="Remind me" placement="bottom">
            <div>
              <Controller
                name="reminder"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <NoteFormReminder reminder={value} onChange={(val) => onChange(val)} />
                )}
              />
            </div>
          </Tooltip>

          <Tooltip title="Add image" placement="bottom">
            <div>
              <NoteFormUploadImage
                onChange={(val) =>
                  setValue('image', val, { shouldDirty: true, shouldValidate: true })
                }
              />
            </div>
          </Tooltip>

          <Tooltip title="Add tasks" placement="bottom">
            <IconButton
              className="w-32 h-32 mx-4 p-0"
              onClick={() => setShowList(!showList)}
              size="large"
            >
              <FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Change labels" placement="bottom">
            <div>
              <NoteFormLabelMenu
                note={noteForm}
                onChange={(labels) => setValue('labels', labels)}
              />
            </div>
          </Tooltip>

          <Controller
            name="archived"
            control={control}
            defaultValue={false}
            render={({ field: { value } }) => (
              <Tooltip title={value ? 'Unarchive' : 'Archive'} placement="bottom">
                <div>
                  <IconButton
                    className="w-32 h-32 mx-4 p-0"
                    onClick={() => {
                      const newValue = !value;
                      setValue('archived', newValue); // Mettre à jour la valeur du champ "archived"
                      if (props.variant === 'new') {
                        setTimeout(() => onCreate(getValues()));
                      }
                    }}
                    size="large"
                  >
                    <FuseSvgIcon size={20}>
                      {value ? 'heroicons-solid:archive' : 'heroicons-outline:archive'}
                    </FuseSvgIcon>
                  </IconButton>
                </div>
              </Tooltip>
            )}
          />

        </div>

        <div className="flex items-center">
          {props.variant === 'new' ? (
            <Button
              className="m-4 p-8"
              type="submit"
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleSubmit(onCreate)}

            >
              Create
            </Button>
          ) : (
            <>
              <Tooltip title="Delete Note" placement="bottom">
                <IconButton className="w-32 h-32 mx-4 p-0" onClick={props.onRemove} size="large">
                  <FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
              </Tooltip>
              <Button className="m-4" onClick={props.onClose} variant="default">
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

NoteForm.propTypes = {};
NoteForm.defaultProps = {
  variant: 'edit',
  note: null,
};

export default withRouter(NoteForm);
