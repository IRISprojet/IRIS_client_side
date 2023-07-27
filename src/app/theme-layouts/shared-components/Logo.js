import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex start items-center">
      <img className="logo-icon w-1/4 h-100" src="https://res.cloudinary.com/dhufakahz/image/upload/v1690137235/logo-dark_tt7qyc.png" alt="logo" />

   
    </Root>
  );
}

export default Logo;
