# skech-redline-utils
Generate redlining symbols for sketch from text values (eg the spacing units in your design system) 


TODO:

-----------------

Refactor text width and alignment.

This is two tasks, but the bigger one probably solves the smaller one.

The smaller one is making sure text doesn't wrap when the width of the spacer symbol is less than the width of the text.

The larger one is refactoring away from absolute positioning into the flexbox model. The existing style compartmentalization is already in the right shape, I'd expect. It's just a matter of defining the right flex properties on a per-direction basis.

Then either let the text be whatever width it needs to be, or, the probably easier thing, let the artboard be as wide as it needs to be to fit the text, and center the other stuff.

-----------------

Build the little H shape thing from the material docs

Inserting into groups is going to be an issue at some point. The H shaped line symbol, particularly. 
read more about doing that here:
https://github.com/airbnb/react-sketchapp/issues/153

-----------------

Add the full library generation:

Render Library: same as classic react-sketchapp, render the library in the current document
Generate Library: it's creating a new sketch document, rendering the library, saving it and adding the file to the user libraries.

add the functionality here:
https://github.com/mathieudutour/react-sketchapp-library
as discussed here:
https://github.com/airbnb/react-sketchapp/issues/172