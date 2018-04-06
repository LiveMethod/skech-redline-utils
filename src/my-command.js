import React from 'react';
import {
  render,
  Artboard,
  Text,
  View,
  Image,
  makeSymbol,
  StyleSheet,
} from 'react-sketchapp';
import values from "../example.json";


const RedSquare = () => (
  <View
    name="Square"
    style={{ width: 100, height: 100, backgroundColor: 'red' }}
  >
    <Text name="Red Square Text">Red Square</Text>
  </View>
);

const RedSquareSym = makeSymbol(RedSquare, 'squares/red');

const BlueSquare = () => (
  <View
    name="Square"
    style={{ width: 100, height: 100, backgroundColor: 'blue' }}
  >
    <Text name="Blue Square Text">Blue Square</Text>
  </View>
);

const BlueSquareSym = makeSymbol(BlueSquare, 'squares/blue');

const Photo = () => (
  <Image
    name="Photo"
    source="https://pbs.twimg.com/profile_images/895665264464764930/7Mb3QtEB_400x400.jpg"
    style={{ width: 100, height: 100 }}
  />
);

const PhotoSym = makeSymbol(Photo);

const Nested = () => (
  <View name="Multi" style={{ display: 'flex', flexDirection: 'column' }}>
    <PhotoSym name="Photo Instance" style={{ width: 75, height: 75 }} />
    <RedSquareSym
      name="Red Square Instance"
      style={{ width: 75, height: 75 }}
    />
  </View>
);

const NestedSym = makeSymbol(Nested);


function makeRedlineUtil(size){
  // this assumes a vertical spacer.
  // there will need to be some ternary action
  // to convert to horizontal
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: size,
    height: 140,
    position: 'relative',
  }
  const textStyle =  {
    color: 'red',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const barStyle =  {
    width: size,
    position: 'absolute',
    bottom: 0,
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'red',
    opacity: 0.2,
  };

  // this is the vertical version
  // logic will be needed for horizontal
  const barResize = {
    top: true,
    right: false,
    bottom: true,
    left: false,
    fixedHeight: false,
    fixedWidth: true 
  }

  const RedlineUtil = () => (
    <View name="Redlines" style={containerStyle}>
      <Text style={textStyle} name="Size">XX</Text>
      <View style={barStyle} resizingConstraint={barResize} />
    </View>
  );

  const RedlineUtilSym = makeSymbol(RedlineUtil);

  // for each of left/right/bottom/top
  // make a symbol with a nested function redlineForDirection(size)
}

makeRedlineUtil(32);

/*

property on View, Text, and Image components

resizingConstraint={{
  top: true,
  right: true,
  bottom: true,
  left: false,
  fixedHeight: true,
  fixedWidth: false 
}}

*/

// function makeRedlineUtils(src) {

//   makeSymbol(() => (
//     <Image
//       name={name}
//       source={`${urlPrefix}${src}`}
//       style={{ width, height }}
//     />
//   ), name)
// }

// values.forEach(v => makeRedlineUtils(v));



export default () => {
  const Document = () => (
    <Artboard name="Swatches" style={{ display: 'flex' }}>
      <NestedSym
        name="Nested Symbol"
        overrides={{
          'Red Square Instance': BlueSquareSym,
          'Blue Square Text': 'TESTING',
          Photo:
            'https://pbs.twimg.com/profile_images/833785170285178881/loBb32g3.jpg',
        }}
      />
    </Artboard>
  );

  render(<Document />, context.document.currentPage());
};