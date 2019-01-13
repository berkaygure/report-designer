import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import HorizontalRuler from '../components/Ruler/HorizontalRuler';
import { PER_PIXEL } from '../helpers/Dimensions';
import VerticalRuler from '../components/Ruler/VerticalRuler';

const PAPER_WIDTH = 672;
const PAPER_HEIGHT = 950;

describe('<HorizontalRuler />', () => {
  it('should be draw horizontal ruler', () => {
    const tree = renderer.create(<HorizontalRuler />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tick `.tick`', () => {
    const wrapper = shallow(<HorizontalRuler width={PAPER_WIDTH} />);
    expect(wrapper.find('.tick')).toHaveLength(Math.ceil(PAPER_WIDTH / PER_PIXEL));
  });
});

describe('<VerticalRuler />', () => {
  it('should be draw vertical ruler', () => {
    const tree = renderer.create(<VerticalRuler />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tick `.tick`', () => {
    const wrapper = shallow(<VerticalRuler height={PAPER_HEIGHT} />);
    expect(wrapper.find('.tick')).toHaveLength(Math.ceil(PAPER_HEIGHT / PER_PIXEL));
  });
});
