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
  cardAction: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardAction__buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardAction__edit: {
    marginTop: '0.5rem',
  },
  cardAction__button: {
    marginLeft: '0.75rem',
    marginTop: '0.5rem',
  },
  popover__title: {
    padding: '1.5rem',
  },
  popover__buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '1.5rem',
    marginBottom: '1rem',
  },
  popover__button: {
    marginRight: '0.5rem',
  },
}));
