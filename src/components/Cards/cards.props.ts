import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Data } from "../../Model/data";

export interface CardsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    counter: React.MouseEventHandler<HTMLButtonElement>
    count: number
    state: Data | undefined
    users: any
    loading: boolean
}