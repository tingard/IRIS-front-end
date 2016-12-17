const templateReplies = {
  none: 'Start typing here, or select a template reply from above',
  graph: [
    'This is a (line/bar/scatter) graph.',
    'The title is: "<b>___</b>"',
    'The X-axis label is: "<b>___</b>"',
    'The Y-axis label is: "<b>___</b>"',
    'The Z-axis label is: "<b>___</b>"',
    'The graph is a plot of <b>_____</b>',
    'The data... (is an exponential / has high scatter / etc...)',
    '(more comments are always welcome!)',
  ].join('<br>'),
  image: 'This is an image',
  other: 'No clue, sorry',
};
export default templateReplies;
