import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import RoundedButton from '../Components/Button/RoundedButton'
import { ApplicationStyles, Images } from '../Themes'

// Styles
import styles from './Styles/PuzzleInfoStyles'

class PuzzleInfo extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>
        <View style={styles.centered}>
          <Image source={Images.igniteClear} style={styles.logo} />
        </View>
        <View style={styles.sectionHeader}>
          <Text>Puzzle Information Here</Text>
          <Text>Props from MapScreen: {this.props.navigation.state.params.test}</Text>
        </View>
      </View>
    )
  }
}

export default PuzzleInfo
