export class DrugInventoryData {
  constructor(
    public id: number,
    public barCodeId: number,
    public drugName: string,
    public unitPrice: number,
    public sellingPrice: number,
    public inventory: number,
    public expiryDate: string,
    public manufacturer: string,
    public notes: string

  ) { }
}
