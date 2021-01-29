import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '30%',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card___title: {
    marginLeft: '0.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  card___info: {
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  card___shippInfo: {
    display: 'flex',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
  card__price: {
    marginRight: '0.5rem',
  },
  card___icon: {
    marginRight: '0.5rem',
  },
  card__cardAction: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card__button: {
    marginLeft: '0.75rem',
  },
}));
