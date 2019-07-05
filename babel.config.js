module.exports = {
  'env': {
    'production': {
      'presets': [
        [
          '@vue/app',
          {'targets': []},
          '@babel/preset-env'
        ]
      ]
    },
    'test': {
      'presets': [
        [
          '@babel/preset-env',
          {'targets': {'node': 'current'}}
        ]
      ]
    }
  }
}
