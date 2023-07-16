import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import format from "date-fns/format";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import ContactAvatar from "../../ContactAvatar";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  "&.active": {
    backgroundColor: theme.palette.background.default,
  },
}));

function ContactListItemContact(props) {
  const { contact } = props;
  const routeParams = useParams();
  const user = useSelector(selectUser);
  return (
    <StyledListItem
      button
      className="px-32 py-12 min-h-80"
      active={routeParams.id === contact._id ? 1 : 0}
      component={NavLinkAdapter}
      to={`/apps/chat/${contact.user._id}`}
      end
      activeClassName="active"
    >
      <ContactAvatar user={user} contact={contact} />

      <ListItemText
        classes={{
          root: "min-w-px px-16",
          primary: "font-medium text-14",
          secondary: "truncate",
        }}
        primary={contact.user.displayName}
        secondary={`Start chatting with ${contact.user.displayName}`}
      />
    </StyledListItem>
  );
}

export default ContactListItemContact;
