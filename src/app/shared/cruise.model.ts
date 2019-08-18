import { Route } from './route.model';

export class Cruise {
        id:number;
        cruiseLineId:number;
        shipId : number;
        cabinTypeId: number;
        title:string;
        departureDate:Date;
        flightIncluded:boolean;
        cruiseLineName:string;
        shipName : string;
        cabinTypeName: string;
        deletedRoutesIDs: string;
}
