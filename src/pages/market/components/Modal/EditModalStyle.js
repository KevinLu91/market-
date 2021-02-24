import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper__field: {
    marginTop: '1rem',

    '&--buttons': {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    '&--radios': {
      marginTop: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  papper__buttonContainer: {
    display: 'flex',
  },
  paper_button: {
    marginLeft: '0.75rem',
  },
}));
