import { craneCategories } from "@/constants/data";
import DesktopCraneCard from "./DesktopCraneCard";
import MobileCraneCard from "./MobileCraneCard";

export default function CraneCategories() {
  return (
    <div className="space-y-0">
      {craneCategories.map((category, index) => (
        <div key={category.id}>
          <DesktopCraneCard category={category} index={index} />
          <MobileCraneCard category={category} />
        </div>
      ))}
    </div>
  );
}
