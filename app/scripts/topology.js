export default function topology() {
  return {
    'cities': [
      {
        'cityId': 'Melbourne',
        'x': 80,
        'y': 80,
        'isIntermediatePoint': false
      },
      {
        'cityId': 'Alice Springs',
        'x': 75,
        'y': 75,
        'isIntermediatePoint': false
      }
    ],
    'connections': [
      {
        'start': 'Melbourne',
        'end': 'Alice Springs'
      }
    ]
  };
}
