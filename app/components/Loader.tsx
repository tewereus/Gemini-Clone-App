import React, { useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Loader = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.loader}>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.loaderBar}>
          <Animated.View
            style={[
              styles.loaderAnimation,
              {
                transform: [
                  {
                    translateX: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-800, 800],
                    }),
                  },
                ],
              },
            ]}>
            <LinearGradient
              colors={['#b1d5ee', '#c953e98a', '#9ed7ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    gap: 10,
  },
  loaderBar: {
    height: 20,
    borderRadius: 4,
    backgroundColor: '#f6f7f8',
    overflow: 'hidden',
  },
  loaderAnimation: {
    height: '100%',
    width: '200%',
  },
});