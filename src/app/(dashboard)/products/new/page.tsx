"use client"

import React, { useState } from "react"
import { 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  UploadCloud, 
  Video, 
  Info,
  Search,
  Check,
  Maximize,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  Plus
} from "lucide-react"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

// مكون زر التبديل المخصص (Custom Toggle Switch)
const CustomToggle = ({ checked, onChange }: { checked: boolean; onChange: (c: boolean) => void }) => (
  <div 
    className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200 ${checked ? 'bg-[#2979ff]' : 'bg-gray-200'}`}
    onClick={() => onChange(!checked)}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </div>
)

// مكون مربع الاختيار المخصص (Custom Checkbox)
const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean; onChange: (c: boolean) => void; label: string }) => (
  <div 
    className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${checked ? 'bg-pink-50/50 border-pink-100' : 'bg-gray-50/50 border-gray-100'}`}
    onClick={() => onChange(!checked)}
  >
    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-[#b02a87] border-[#b02a87]' : 'bg-white border-gray-300'}`}>
      {checked && <Check className="w-3.5 h-3.5 text-white" />}
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </div>
)

// مكون القسم القابل للطي (Collapsible Section Card)
const SectionCard = ({ 
  title, 
  children, 
  defaultOpen = true, 
  rightElement 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  rightElement?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-sm">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="text-gray-400">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {rightElement && (
          <div onClick={(e) => e.stopPropagation()}>
            {rightElement}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-100 mt-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default function CreateProductPage() {
  // حالات الأزرار التبديلية (State for toggles)
  const [variantsEnabled, setVariantsEnabled] = useState(false)
  const [relatedProductsEnabled, setRelatedProductsEnabled] = useState(false)
  const [cloakingEnabled, setCloakingEnabled] = useState(true)
  const [customSettingsEnabled, setCustomSettingsEnabled] = useState(false)
  
  // حالات مربعات الاختيار (State for checkboxes)
  const [onStore, setOnStore] = useState(true)
  const [trackInventory, setTrackInventory] = useState(true)

  // حالة الوصف (Description state)
  const [description, setDescription] = useState("")

  return (
    // الحاوية الرئيسية مع بطانة من الأسفل لترك مساحة للشريط العائم
    <div className="max-w-[1400px] mx-auto pb-24 font-sans text-gray-800 pt-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Create product</h1>
      
      {/* شبكة التقسيم: 75% للمحتوى الرئيسي و 25% للشريط الجانبي في الشاشات الكبيرة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= العمود الرئيسي (Main Content - 75% / col-span-9) ================= */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* قسم المعلومات الأساسية (Basic Info) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Name ( Ex: blue summer shirt... )" 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all text-sm"
              />
              
              <div className="flex border border-gray-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#b02a87]/20 focus-within:border-[#b02a87] transition-all">
                <span className="bg-gray-50 px-4 py-2.5 text-sm text-gray-500 border-r border-gray-200 hidden sm:block">
                  https://smomo.shop/products/
                </span>
                <input 
                  type="text" 
                  placeholder="Slug" 
                  className="flex-1 px-4 py-2.5 outline-none text-sm min-w-0"
                />
              </div>
              
              <div className="relative">
                <select defaultValue="" className="w-full px-4 py-2.5 border border-gray-200 rounded-md appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all text-gray-600">
                  <option value="" disabled>Select a category</option>
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>

              {/* محرر النصوص الغني (Rich Text Editor) */}
              <RichTextEditor 
                value={description}
                onChange={setDescription}
                placeholder="Type something"
              />
            </div>
          </div>

          {/* قسم التسعير (Pricing) */}
          <SectionCard title="Pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Price</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Compare at price</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Cost price</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
              </div>
            </div>
          </SectionCard>

          {/* قسم الوسائط والصور (Images) */}
          <SectionCard 
            title="Images" 
            rightElement={
              <div className="flex items-center gap-2">
                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 text-xs font-medium rounded-md hover:bg-purple-100 transition-colors border border-purple-100">
                  <Sparkles className="w-3.5 h-3.5" /> Generate
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#b02a87] text-white text-xs font-medium rounded-md hover:bg-[#90226e] transition-colors shadow-sm">
                  <UploadCloud className="w-3.5 h-3.5" /> Upload images
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#b02a87] text-white text-xs font-medium rounded-md hover:bg-[#90226e] transition-colors shadow-sm">
                  <Video className="w-3.5 h-3.5" /> Add video link
                </button>
              </div>
            }
          >
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 font-medium">Note: For best visual appearance, use a product image with a size of 800x800.</p>
            </div>
          </SectionCard>

          {/* قسم المتغيرات (Variants) */}
          <SectionCard 
            title="Variants" 
            defaultOpen={true}
            rightElement={<CustomToggle checked={variantsEnabled} onChange={setVariantsEnabled} />}
          >
            {!variantsEnabled && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 font-medium">Variants not enabled</p>
              </div>
            )}
          </SectionCard>

          {/* قسم المنتجات ذات الصلة (Related products) */}
          <SectionCard 
            title="Related products" 
            defaultOpen={true}
            rightElement={<CustomToggle checked={relatedProductsEnabled} onChange={setRelatedProductsEnabled} />}
          >
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add related products</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search for products" 
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" 
                />
              </div>
            </div>
          </SectionCard>

          {/* قسم الإخفاء (Cloaking) */}
          <SectionCard 
            title="Cloaking" 
            defaultOpen={true}
            rightElement={<CustomToggle checked={cloakingEnabled} onChange={setCloakingEnabled} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1">
                  Allowed countries <Info className="w-3 h-3 text-gray-400" />
                </label>
                <div className="relative">
                  <select defaultValue="" className="w-full px-4 py-2 border border-gray-200 rounded-md appearance-none bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all text-gray-500">
                    <option value="">Search for Countries</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1">
                  Product
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Search for products" 
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" 
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* قسم الخيارات المتقدمة (Advanced options) */}
          <SectionCard 
            title="Advanced options" 
            defaultOpen={true}
          >
            <div className="flex items-center justify-between mt-2 p-4 border border-gray-100 rounded-md bg-gray-50/50">
              <span className="text-sm font-medium text-gray-700">Custom product settings</span>
              <CustomToggle checked={customSettingsEnabled} onChange={setCustomSettingsEnabled} />
            </div>
          </SectionCard>

          {/* قسم تحسين محركات البحث (SEO) */}
          <SectionCard title="SEO" defaultOpen={true}>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta slug</label>
                  <input type="text" placeholder="Slug" className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta title</label>
                  <input type="text" placeholder="Title" className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta description</label>
                <textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta images</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors">
                  <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-600">Choose file to upload</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ================= الشريط الجانبي (Sidebar - 25% / col-span-3) ================= */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* قسم الرؤية (Visibility) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Visibility</h3>
            <CustomCheckbox 
              checked={onStore} 
              onChange={setOnStore} 
              label="Online store" 
            />
          </div>

          {/* قسم بيانات التخزين (Storage details) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Storage details</h3>
            <div className="space-y-3">
              <input type="text" placeholder="SKU" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
              <input type="text" placeholder="Barcode" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
              <input type="text" placeholder="Weight" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
            </div>
          </div>

          {/* قسم تتبع المخزون (Inventory) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Inventory</h3>
            <div className="space-y-3">
              <CustomCheckbox 
                checked={trackInventory} 
                onChange={setTrackInventory} 
                label="Track inventory" 
              />
              <input type="text" placeholder="Add inventory" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" />
            </div>
          </div>

          {/* قسم التصنيف الجانبي (Category) */}
          <SectionCard title="Category" defaultOpen={true}>
            <div className="mt-2 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search categories" 
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" 
                />
              </div>
              <button className="flex items-center gap-1 text-[#b02a87] text-xs font-medium hover:underline">
                <Plus className="w-3 h-3" /> Add a new category
              </button>
            </div>
          </SectionCard>

          {/* قسم الموردين (Vendors) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Vendors</h3>
            <input 
              type="text" 
              placeholder="Type in (comma separated)" 
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#b02a87]/20 focus:border-[#b02a87] transition-all" 
            />
          </div>

        </div>
      </div>

      {/* ================= الشريط العائم الثابت لزر الحفظ (Fixed Bottom Action Bar) ================= */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white/80 backdrop-blur-md z-50 flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-4 md:px-8">
        <div className="w-full max-w-[1400px] mx-auto flex justify-end">
          <button className="flex items-center gap-2 px-8 py-2.5 bg-[#b02a87] text-white font-medium rounded-md hover:bg-[#90226e] transition-colors shadow-md">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  )
}
