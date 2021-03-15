import { render, screen } from '@testing-library/react';
import { getFastest, parseUserInput } from './services/pyramid';

/*test('Parses user input', () => {
  const parsed = parseUserInput(`
      1
     2 3
    4 5 6
  `);
  const expected = [[1], [2, 3], [4, 5, 6]];
  console.log(parsed)
  expect(parsed).toBe(expected);
});*/

test('Pyramid works', () => {
  /*render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/

  const f0 = getFastest(`
     1
  `);
  const res0 = 1;

  const f1 = getFastest(`
     1
    2 3
  `);
  const res1 = 3;

  const f2 = getFastest(`
      1
     2 3
    4 5 6
  `);
  const res2 = 7;

  const f3 = getFastest(`
       5
      2 1
     1 3 9
    5 4 2 8
  `);
  const res3 = 11;

  expect(f0.min).toBe(res0);
  expect(f1.min).toBe(res1);
  expect(f2.min).toBe(res2);
  expect(f3.min).toBe(res3);
});


