import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../input';

test('Input', () => {
  const onHandleChange = (event) => {
    expect(event).toEqual('something');
  };

  const component = renderer.create(
    <Input label="this" value="is alright" type="text" handleChange={onHandleChange} id="input" />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
