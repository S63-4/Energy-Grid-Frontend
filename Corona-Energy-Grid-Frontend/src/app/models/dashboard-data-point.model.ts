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
    Consumption: number;
    Production: number;
    DateTime: Date;
    constructor(obj: DashboardDataPointData = {} as DashboardDataPoint) {
        const {
            Consumption = 0,
            Production = 0,
            DateTime = null
        } = obj
        this.Consumption = Consumption;
        this.DateTime = DateTime;
        this.Production = Production;
    }
}
interface DashboardDataPointData {
    Consumption: number;
    Production: number;
    DateTime: Date;
}
interface DashboardModelData {
    data: Array<DashboardDataPoint>;
}