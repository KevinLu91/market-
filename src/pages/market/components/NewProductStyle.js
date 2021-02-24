import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  paper__title: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  paper__button: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  paper_loading: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  paper__image: {
    marginTop: '1rem',
    width: '30vw',
  },
}));

export const photoPickerTheme = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: { marginTop: '1rem', marginBottom: '1rem' },
  sectionBody: {
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '50vw',
  },
  photoPickerButton: { marginBottom: '1rem' },
};
