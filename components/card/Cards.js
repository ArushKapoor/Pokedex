import CardItem from "./CardItem";
import { useStateValue } from "../react-context-api/StateProvider";
// import { FixedSizeList as List } from "react-window";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
  ColumnSizer,
} from "react-virtualized";
import { useEffect, useRef, useState } from "react";

function Cards() {
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      // defaultHeight: 150,
      minHeight: 330,
    })
  );
  const [{ allPokemons, searchName }] = useStateValue();

  const [toDisplay, setToDisplay] = useState([]);

  useEffect(() => {
    let matches = [];
    matches = allPokemons.map((pokemon) => {
      const regex = new RegExp(`${searchName}`, "gi");
      if (pokemon.name.match(regex)) {
        return pokemon;
      }
    });

    matches = matches.filter(function (element) {
      return element !== undefined;
    });

    const chunkSize = 4;
    const groups = matches
      .map((e, i) => {
        return i % chunkSize === 0 ? matches.slice(i, i + chunkSize) : null;
      })
      .filter((e) => {
        return e;
      });

    console.log(matches);
    console.log(groups);

    setToDisplay(groups);
  }, [allPokemons, searchName]);

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="grid grid-cols-4 gap-10 py-8 px-32 z-0">
        {toDisplay[index].map((pokemon) => {
          if (pokemon == undefined) {
            return <span></span>;
          } else {
            return <CardItem key={pokemon.name} pokemon={pokemon} />;
          }
        })}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "90vh" }} className="">
      <AutoSizer>
        {({ width, height }) => (
          <ColumnSizer
            columnMaxWidth={85}
            columnMinWidth={30}
            columnCount={4}
            width={width}
          >
            {({ adjustedWidth, getColumnWidth, registerChild }) => (
              <Grid
                ref={registerChild}
                height={height}
                rowCount={toDisplay.length}
                columnCount={4}
                columnWidth={adjustedWidth}
                width={width}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                cellRenderer={({
                  columnIndex, // Horizontal (column) index of cell
                  isScrolling, // The Grid is currently being scrolled
                  isVisible, // This cell is visible within the grid (eg it is not an overscanned cell)
                  key, // Unique key within array of cells
                  parent, // Reference to the parent Grid (instance)
                  rowIndex, // Vertical (row) index of cell
                  style, // Style object to be applied to cell (to position it);
                  // This must be passed through to the rendered cell element.
                }) => {
                  return (
                    <div style={style} className="p-4 ml-4 mt-2 ">
                      <CellMeasurer
                        cache={cache.current}
                        parent={parent}
                        columnIndex={columnIndex}
                        rowIndex={rowIndex}
                        style={style}
                        key={key}
                      >
                        {toDisplay[rowIndex].length > columnIndex && (
                          <div className="m-2 ">
                            <CardItem
                              style={style}
                              pokemon={toDisplay[rowIndex][columnIndex]}
                            />
                          </div>
                        )}
                        {/* <CardItem key={key} pokemon={toDisplay[index][0]} /> */}
                      </CellMeasurer>
                    </div>
                  );
                }}
              />
            )}
          </ColumnSizer>
        )}
      </AutoSizer>
    </div>
    //   {/* {Row} */}
    // {/* </List> */}
  );
}

// <List
//             height={height}
//             rowCount={toDisplay.length}
//             width={width}
//             rowHeight={cache.current.rowHeight}
//             deferredMeasurementCache={cache.current}
//             rowRenderer={({ key, index, style, parent }) => {
//               return (
//                 <div style={style}>
//                   <CellMeasurer
//                     cache={cache.current}
//                     parent={parent}
//                     columnIndex={0}
//                     rowIndex={index}
//                     style={style}
//                     key={key}
//                   >
//                     <div
//                       style={style}
//                       className="grid grid-cols-4 gap-10 py-8 px-32 z-0"
//                     >
//                       {toDisplay[index].map((pokemon) => {
//                         return (
//                           <CardItem style={style} key={key} pokemon={pokemon} />
//                         );
//                       })}
//                     </div>
//                     {/* <CardItem key={key} pokemon={toDisplay[index][0]} /> */}
//                   </CellMeasurer>
//                 </div>
//               );
//             }}
//           />

{
  /* <div className="grid grid-cols-4 gap-10 py-8 px-32 z-0">
      {allPokemons.map((pokemon) => {
        const regex = new RegExp(`${searchName}`, "gi");
        if (pokemon.name.match(regex)) {
          return <CardItem key={pokemon.name} pokemon={pokemon} />;
        }
      })}
    </div> */
}

export default Cards;
