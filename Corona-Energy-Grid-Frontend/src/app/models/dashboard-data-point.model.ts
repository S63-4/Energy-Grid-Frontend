export class DashboardModel {
    data: Array<DashboardDataPoint>;
    constructor(obj: DashboardModelData = {} as DashboardModel) {
        const {
            data = null
        } = obj;
        this.data = data;
    }
}
export class DashboardDataPoint {
    consumption: number;
    production: number;
    name: string;
    dateTime: Date;
    constructor(obj: DashboardDataPointData = {} as DashboardDataPoint) {
        const {
            consumption = 0,
            production = 0,
            name = null,
            dateTime = null
        } = obj
        this.consumption = consumption;
        this.name = name;
        this.production = production;
        this.dateTime = dateTime;
    }
}
interface DashboardDataPointData {
    consumption: number;
    production: number;
    name: string;
    dateTime : Date;
}
interface DashboardModelData {
    data: Array<DashboardDataPoint>;
}
