import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '@actions';

export const useEasyRegistration = () => {
  const dispatch = useDispatch();
  const searchLocationState = useSelector(
    (state: any) => state.global.searchLocations,
  );

  const searchLocation = (keyword: string) => {
    dispatch(
      Actions.searchLocation({ keyword, skip: 0, limit: 100, loading: true }),
    );
  };

  return { searchLocation, searchLocationState };
};
