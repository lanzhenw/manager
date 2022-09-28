import { GridCellProps } from "@progress/kendo-react-grid";
import React from "react";
import { ReactNode } from "react";
import { IData } from "../../types/common";

interface CellRenderProps {
    originalProps: GridCellProps;
    td: React.ReactElement<HTMLTableCellElement>;
    enterEdit: (dataItem: IData, field: string | undefined) => void;
    editField: string | undefined;
  }

  
const CellRender = (props: CellRenderProps) => {
    const dataItem = props.originalProps.dataItem;
    const cellField = props.originalProps.field;
    const inEditField = dataItem[props.editField || ""];
    const additionalProps =
      cellField && cellField === inEditField
        ? {
            ref: (td: HTMLTableCellElement) => {
              const input = td && td.querySelector("input");
              const activeElement = document.activeElement;
  
              if (
                !input ||
                !activeElement ||
                input === activeElement ||
                !activeElement.contains(input)
              ) {
                return;
              }
  
              if (input.type === "checkbox") {
                input.focus();
              } else {
                input.select();
              }
            },
          }
        : {
            onClick: () => {
                console.info( cellField, "cellfield")
              props.enterEdit(dataItem, cellField);
            },
          };
  
    const clonedProps: any = { ...props.td.props, ...additionalProps };
    return React.cloneElement(props.td, clonedProps, props.td.props.children as unknown as ReactNode);
  }

  export default CellRender