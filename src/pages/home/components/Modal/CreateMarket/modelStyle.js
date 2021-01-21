import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'start',
    marginTop: '15%',
    justifyContent: 'center',
  },
  modal__card: {
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal__title: {
    marginBottom: '1rem',
  },
  modal__cardActions: {
    justifyContent: 'flex-end',
  },
  modal__box: {
    display: 'flex',
    alignItems: 'center',
  },
  modal__formControl: {
    marginTop: '2rem',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  modal__button: {
    '&--add': {
      marginTop: '1.25rem',
    },
  },
  modal__chip: {
    marginTop: '1rem',
    marginRight: '0.5rem',
  },
}));
