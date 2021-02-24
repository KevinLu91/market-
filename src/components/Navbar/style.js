import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar__menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar__title: {
    flexGrow: 1,
    display: 'flex',
    alignContent: 'center',
  },
  toolbar__navLink: {
    textDecoration: 'none',
  },
  toolbar__nav: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.5rem',
  },
  toolbar__icon: {
    marginRight: '0.5rem',
  },
  menu: {
    width: 250,
  },
  menu__listItem: {
    cursor: 'pointer',
    '&:hover': {
      background: '#e3e2dd',
    },
  },
}));
