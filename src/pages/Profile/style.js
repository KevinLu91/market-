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
  orderCard: {
    width: '50%',
    marginBottom: '1rem',
    padding: '1rem',
  },
  orderCard__typograpphy: {
    marginBottom: '0.5rem',
    marginLeft: '1rem',

    '&--emailed': {
      marginLeft: '1rem',
    },
    '&--shipped': {
      marginBottom: '0.5rem',
      marginLeft: '2rem',
    },
  },
  tableContainer: {},
}));
