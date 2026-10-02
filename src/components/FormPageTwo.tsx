import { PageFrame } from "./PageFrame";
import { PhotoSlot } from "./PhotoSlot";
import { BrandLogo } from "./BrandLogo";
import { DateSerialRow } from "./DateSerialRow";
import { useCVForm } from "../context/CVFormContext";

export function FormPageTwo() {
  const { formData, setPhoto } = useCVForm();

  return (
    <PageFrame
      label="Application for Employment, page 2"
      footer={
      <footer className="flex h-[34px] items-center justify-between border border-black bg-navy px-3 font-sans text-[15px] text-white">
          <span>DAREIN EST - Application for Employment</span>
          <span className="pr-4">Page 2</span>
        </footer>
      }>
      
      <header className="flex h-[88px] items-center border-b-[5px] border-navy px-[24px]">
        <BrandLogo size="sm" />
        <div className="ml-[34px]">
          <h1 className="font-serif text-[21px] font-bold text-navy">DAREIN EST</h1>
          <div className="mt-[4px] rounded-[5px] border border-black bg-navy px-3 py-[4px] font-serif text-[11px] font-bold text-white">
            FOR RECRUITMENT OF DOMESTIC MANPOWER
          </div>
        </div>
        <div className="ml-[16px] mt-[28px] w-[411px]">
          <DateSerialRow
            columns={["58px", "136px", "84px", "133px"]}
            height="h-[28px]"
            compact
            dateValue={formData.date}
            serialNoValue={formData.serialNo} />
        </div>
      </header>

      <div className="mx-[54px] mt-[18px] flex h-[40px] items-center justify-center border border-black bg-navy font-sans text-[15px] text-white">
        PASSPORT COPY ATTACHMENT
      </div>

      <div className="mt-[20px] flex justify-center">
        <PhotoSlot
          title="Passport"
          size="3.54” x 5.18”"
          value={formData.passportPhoto}
          onChange={(photo) => setPhoto("passportPhoto", photo)}
          className="h-[398px] w-[582px]" />
      </div>
    </PageFrame>);

}