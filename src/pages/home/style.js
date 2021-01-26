import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    marginTop: '5rem',
    minWidth: 275,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  card__title: {
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
});
