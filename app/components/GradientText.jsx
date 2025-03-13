import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export const GradientText = ({ text, style }) => {
  return (
    <MaskedView
      maskElement={<Text style={style}>{text}</Text>}>
      <LinearGradient
        colors={['#4b90ff', '#ff5546']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}>
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};