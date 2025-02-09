import { Layout } from "@/types/types";
import { Columns2, Columns3, Columns4,  RectangleHorizontalIcon } from "lucide-react";



export const data : Layout[] =  [
    {
        label : 'Column',
        type : 'column',
        numOfCol : 1,
        icon : RectangleHorizontalIcon
    },
    {
        label : '2 Columns',
        type : 'column',
        numOfCol : 2,
        icon : Columns2
    },
    {
        label : '3 Columns',
        type : 'column',
        numOfCol : 3,
        icon : Columns3
    },
    {
        label : '4 Columns',
        type : 'column',
        numOfCol : 4,
        icon : Columns4
    },

]