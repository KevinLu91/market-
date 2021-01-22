import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    width: '80vw',
  },
  card: {
    marginBottom: '1.5rem',
  },
  cardContent: {
    display: 'flex',

    alignItems: 'center',
  },
  cardContent__info: {
    flex: 2,
  },
  cardContent__tags: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  cardContent__titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  cardContent__title: {
    marginRight: '1rem',
  },
  cardContent__product: {
    marginRight: '0.5rem',
  },
  cardContent__tag: {
    marginTop: '0.5rem',
    marginRight: '0.5rem',
  },
});
