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

function makeRedlineUtil(size, name){
  const color = 'red';
  const textSize = 18;

  // for each element styled by this sheet,
  // styles appear in the following order:
  // 
  // fooAll: all symbols
  // fooV: all vertical symbols
  // fooH: all horizontal symbols
  // fooT: top aligned symbols
  // fooB: bottom aligned symbols
  // fooL: left aligned symbols
  // fooR: right aligned symbols
  // 
  // This is perhaps needlessly complicated.

  const s = StyleSheet.create({
    containerAll: {
      display: 'flex',
      position: 'relative',
    },
    containerV: {
      flexDirection: 'column',
      // vertical text needs to be manually sized
      // or it will wrap when spacing unit width
      // is less than the natural text width
      width: name ? (name.length * textSize) : size,
      height: 140,
    },
    containerH: {
      flexDirection: 'row',
      width: 140,
      height: size,
    },
    textAll: {
      color: color,
      fontSize: textSize,
      lineHeight: textSize*0.8,
      fontStyle: 'normal',
      fontWeight: 'bold',
      position: 'absolute',
    },
    textV: {
      textAlign: 'center',
      left: 0,
      right: 0,
    },
    textT:{
      top: 0,
    },
    textB:{
      bottom: 0,
    },
    textH: {
      top: (size*0.5) - (textSize*0.5),
    },
    textL: {
      textAlign: 'left',
      left: 0,
    },
    textR: {
      textAlign: 'right',
      right: 0,
    },
    barAll: {
      position: 'absolute',
      backgroundColor: color,
      opacity: 0.2,
    },
    barV: {
      width: size,
      height: 100,
      alignSelf: 'center',
    },
    barT: {
      bottom: 0,
    },
    barB: {
      top: 0,
    },
    barH: {
      width: 100,
      height: size,
    },
    barL: {
      right: 0,
    },
    barR: {
      left: 0,
    }
  });

  const barResizeV = {
    top: true,
    right: false,
    bottom: true,
    left: false,
    fixedHeight: false,
    fixedWidth: true
  }

  const barResizeH = {
    top: false,
    right: true,
    bottom: false,
    left: true,
    fixedHeight: true,
    fixedWidth: false
  }

  const textResizeT = {
    top: true,
    right: true,
    bottom: false,
    left: true,
    fixedHeight: true,
    fixedWidth: false
  }

  const textResizeB = {
    top: false,
    right: true,
    bottom: true,
    left: true,
    fixedHeight: true,
    fixedWidth: false
  }

  const textResizeL = {
    top: true,
    right: false,
    bottom: false,
    left: true,
    fixedHeight: true,
    fixedWidth: false
  }

  const textResizeR = {
    top: true,
    right: true,
    bottom: false,
    left: false,
    fixedHeight: true,
    fixedWidth: false
  }



  function redlineForDirection(direction){
    let symbolName = `spacer-${name}-${size}-${direction}`;

    // Build combined styles depending on direction
    let containerStyle, textStyle, barStyle, barResize, textResize;

    switch(direction){
      case 'top':
        containerStyle = StyleSheet.flatten([s.containerAll, s.containerV]);
        textStyle = StyleSheet.flatten([s.textAll, s.textV, s.textT]);
        barStyle = StyleSheet.flatten([s.barAll, s.barV, s.barT]);

        barResize = barResizeV;
        textResize = textResizeT;
        break;
      case 'bottom':
        containerStyle = StyleSheet.flatten([s.containerAll, s.containerV]);
        textStyle = StyleSheet.flatten([s.textAll, s.textV, s.textB]);
        barStyle = StyleSheet.flatten([s.barAll, s.barV, s.barB]);

        barResize = barResizeV;
        textResize = textResizeB;
        break;
      case 'left':
        containerStyle = StyleSheet.flatten([s.containerAll, s.containerH]);
        textStyle = StyleSheet.flatten([s.textAll, s.textH, s.textL]);
        barStyle = StyleSheet.flatten([s.barAll, s.barH, s.barL]);

        barResize = barResizeH;
        textResize = textResizeL;
        break;
      case 'right':
        containerStyle = StyleSheet.flatten([s.containerAll, s.containerH]);
        textStyle = StyleSheet.flatten([s.textAll, s.textH, s.textR]);
        barStyle = StyleSheet.flatten([s.barAll, s.barH, s.barR]);

        barResize = barResizeH;
        textResize = textResizeR;
        break;
    }

    // Build component
    // const RedlineUtil = () => (
    makeSymbol(() => (
      <View name={symbolName} style={containerStyle}>
        {/*direction == 'top' || direction == 'left'  && (
          <Text style={textStyle} name="Size">{size}</Text>
        )*/}
        <Text style={textStyle} name="Size" resizingConstraint={textResize}>
          {name}
        </Text>
        <View style={barStyle} resizingConstraint={barResize} />

        {/*direction == 'bottom' || direction == 'right'  && (
          <Text style={textStyle} name="Size">{size}</Text>
        )*/}
      </View>
    ), symbolName);
  }

  let directions = ['top','bottom','left','right'];

  for(let d of directions){
    redlineForDirection(d);
  }
}

for(let v of values.values){
  makeRedlineUtil(v["size"], v["name"])  
}

export default () => {
  const Document = () => (
    <Artboard name="Swatches" style={{ display: 'flex' }}>
      <Text>View Symbols page to see redline utils</Text>
    </Artboard>
  );

  render(<Document />, context.document.currentPage());
};