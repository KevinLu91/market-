import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container__market: {
    width: '80vw',
    marginTop: '2rem',
  },
  container__link: {
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '0.5rem',
  },
  container__Box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  container__firstElem: {
    marginRight: '0.5rem',
  },
  container__secondElem: {
    marginRight: '0.5rem',
  },
  tabContainer: {
    width: '80%',
  },
  tabContainer__paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabContainer__loading: {
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
