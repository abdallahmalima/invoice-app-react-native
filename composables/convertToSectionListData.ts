import { InvoiceType } from "../screens/Home";

type SectionListDataType={
  title:string;
  data:InvoiceType[]
}

const convertToSectionListData = (invoices:InvoiceType[]):SectionListDataType[] => {
    const sectionListData:SectionListDataType[] = [];
    let currentSection:SectionListDataType | null = null;

    invoices.forEach((invoice:InvoiceType) => {
      const { mainContact, id, aName, eName, unit, quantity, price, discount, taxPercentage } = invoice;

      if (currentSection === null || currentSection.title !== mainContact) {
        currentSection = { title: mainContact, data: [] };
        sectionListData.push(currentSection);
      }

      currentSection.data.push({
        id,
        mainContact,
        aName,
        eName,
        unit,
        quantity,
        price,
        discount,
        taxPercentage,
      });
    });

    return sectionListData;
  };

  export default convertToSectionListData;