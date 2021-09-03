import OmsNav from './oms.navigation';
import ExampleNav from './example.navigation';
import Example2Nav from './example2.navigation';
import AuthNav from './auth.navigation';
import SharedNav from './shared.navigation';

const index = {
  ...OmsNav,
  ...ExampleNav,
  ...Example2Nav,
  ...AuthNav,
  ...SharedNav,
};

export default index;
