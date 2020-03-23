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
    Label: string;
    constructor(obj: DashboardDataPointData = {} as DashboardDataPoint) {
        const {
            Consumption = 0,
            Production = 0,
            Label = null
        } = obj;
        this.Consumption = Consumption;
        this.Label = Label;
        this.Production = Production;
    }
}
interface DashboardDataPointData {
    Consumption: number;
    Production: number;
    Label: string;
}
interface DashboardModelData {
    data: Array<DashboardDataPoint>;
}
