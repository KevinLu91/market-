import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container__profile: {
    width: '80vw',
    marginTop: '2rem',
  },
  container__divider: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '50%',
  },
}));
