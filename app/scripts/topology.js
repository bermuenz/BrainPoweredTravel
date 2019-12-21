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
      },
      {
        'cityId': '3',
        'x': 79,
        'y': 74,
        'isIntermediatePoint': false
      },
      {
        'cityId': '4',
        'x': 78,
        'y': 78,
        'isIntermediatePoint': false
      },
      {
        'cityId': '5',
        'x': 80.5,
        'y': 71,
        'isIntermediatePoint': false
      },
      {
        'cityId': '6',
        'x': 75,
        'y': 67,
        'isIntermediatePoint': false
      },
      {
        'cityId': '7',
        'x': 80,
        'y': 60,
        'isIntermediatePoint': true
      },
      {
        'cityId': '8',
        'x': 79,
        'y': 52,
        'isIntermediatePoint': true
      },
      {
        'cityId': '9',
        'x': 78.5,
        'y': 46,
        'isIntermediatePoint': false
      }
    ],
    'connections': [
      {
        'start': 'Melbourne',
        'end': 'Alice Springs'
      },
      {
        'start': 'Melbourne',
        'end': '4'
      },{
        'start': '4',
        'end': 'Alice Springs'
      },{
        'start': 'Melbourne',
        'end': '3'
      },{
        'start': '3',
        'end': 'Alice Springs'
      },{
        'start': '6',
        'end': 'Alice Springs'
      },{
        'start': 'Melbourne',
        'end': '5'
      },{
        'start': '5',
        'end': '7'
      },{
        'start': '7',
        'end': '8'
      },{
        'start': '8',
        'end': '9'
      }
    ]
  };
}
