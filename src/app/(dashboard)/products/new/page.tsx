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
import { createProduct } from "@/app/actions/product"
import { useRouter } from "next/navigation"

// مكون زر التبديل المخصص (Custom Toggle Switch)
const CustomToggle = ({ checked, onChange }: { checked: boolean; onChange: (c: boolean) => void }) => (
  <div 
    className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-200 ${checked ? 'bg-[#ff2d55]' : 'bg-muted'}`}
    onClick={() => onChange(!checked)}
  >
    <div className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </div>
)

// مكون مربع الاختيار المخصص (Custom Checkbox)
const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean; onChange: (c: boolean) => void; label: string }) => (
  <div 
    className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${checked ? 'bg-[#ff2d55]/10 border-[#ff2d55]/30' : 'bg-muted/50 border-border'}`}
    onClick={() => onChange(!checked)}
  >
    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-[#ff2d55] border-[#ff2d55]' : 'bg-background border-border'}`}>
      {checked && <Check className="w-3.5 h-3.5 text-white" />}
    </div>
    <span className="text-sm font-medium text-foreground">{label}</span>
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
    <div className="bg-card border border-border rounded-lg overflow-hidden mb-4 shadow-sm text-card-foreground">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        {rightElement && (
          <div onClick={(e) => e.stopPropagation()}>
            {rightElement}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="p-4 pt-0 border-t border-border mt-2">
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

  const [imageName, setImageName] = useState<string | null>(null)

  // حالة الوصف (Description state)
  const [description, setDescription] = useState("")
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append("description", description)
    
    const result = await createProduct(formData)
    
    if (result.success) {
      router.push("/products")
    } else {
      alert(result.error || "Something went wrong")
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[1400px] mx-auto pb-24 font-sans text-foreground pt-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Create product</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= العمود الرئيسي (Main Content - 75% / col-span-9) ================= */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* قسم المعلومات الأساسية (Basic Info) */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm text-card-foreground">
            <div className="space-y-4">
              <input 
                type="text" 
                name="name"
                required
                placeholder="Name ( Ex: blue summer shirt... )" 
                className="w-full px-4 py-2.5 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all text-sm"
              />
              
              <div className="flex border border-border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#ff2d55]/20 focus-within:border-[#ff2d55] transition-all">
                <span className="bg-muted px-4 py-2.5 text-sm text-muted-foreground border-r border-border hidden sm:block">
                  https://smomo.shop/products/
                </span>
                <input 
                  type="text" 
                  placeholder="Slug" 
                  className="flex-1 px-4 py-2.5 outline-none text-sm min-w-0 bg-background"
                />
              </div>
              
              <div className="relative">
                <select name="categoryId" defaultValue="" className="w-full px-4 py-2.5 border border-border rounded-md appearance-none bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all text-foreground">
                  <option value="">Select a category (Optional)</option>
                  {/* Real categories should be fetched here in a real app, but for now we leave it simple */}
                </select>
                <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-4 top-3.5 pointer-events-none" />
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
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Price</label>
                <input type="number" name="price" step="0.01" required className="w-full px-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Compare at price</label>
                <input type="text" className="w-full px-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Cost price</label>
                <input type="text" className="w-full px-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
              </div>
            </div>
          </SectionCard>

          {/* قسم الوسائط والصور (Images) */}
          <SectionCard 
            title="Images" 
            rightElement={
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  name="image" 
                  id="image-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImageName(file.name);
                  }}
                />
                <button type="button" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-medium rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors border border-purple-100 dark:border-purple-800/30">
                  <Sparkles className="w-3.5 h-3.5" /> Generate
                </button>
                <button 
                  type="button" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-[#ff2d55] text-white text-xs font-medium rounded-md hover:bg-[#e6224c] transition-colors shadow-sm"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Upload images
                </button>
                <button type="button" className="flex items-center gap-1.5 px-4 py-1.5 bg-[#ff2d55] text-white text-xs font-medium rounded-md hover:bg-[#e6224c] transition-colors shadow-sm">
                  <Video className="w-3.5 h-3.5" /> Add video link
                </button>
              </div>
            }
          >
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-md flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Note: For best visual appearance, use a product image with a size of 800x800.</p>
                {imageName && <p className="text-xs text-green-600 mt-1 font-bold">Selected: {imageName}</p>}
              </div>
            </div>
          </SectionCard>

          {/* قسم المتغيرات (Variants) */}
          <SectionCard 
            title="Variants" 
            defaultOpen={true}
            rightElement={<CustomToggle checked={variantsEnabled} onChange={setVariantsEnabled} />}
          >
            {!variantsEnabled && (
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-md flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Variants not enabled</p>
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
              <label className="block text-sm font-medium text-foreground mb-2">Add related products</label>
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search for products" 
                  className="w-full pl-9 pr-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" 
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
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                  Allowed countries <Info className="w-3 h-3 text-muted-foreground" />
                </label>
                <div className="relative">
                  <select defaultValue="" className="w-full px-4 py-2 border border-border bg-background rounded-md appearance-none text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all text-muted-foreground">
                    <option value="">Search for Countries</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                  Product
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Search for products" 
                    className="w-full pl-9 pr-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" 
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
            <div className="flex items-center justify-between mt-2 p-4 border border-border rounded-md bg-muted/50">
              <span className="text-sm font-medium text-foreground">Custom product settings</span>
              <CustomToggle checked={customSettingsEnabled} onChange={setCustomSettingsEnabled} />
            </div>
          </SectionCard>

          {/* قسم تحسين محركات البحث (SEO) */}
          <SectionCard title="SEO" defaultOpen={true}>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Meta slug</label>
                  <input type="text" placeholder="Slug" className="w-full px-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Meta title</label>
                  <input type="text" placeholder="Title" className="w-full px-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Meta description</label>
                <textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Meta images</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                  <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-muted-foreground">Choose file to upload</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ================= الشريط الجانبي (Sidebar - 25% / col-span-3) ================= */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* قسم الرؤية (Visibility) */}
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm text-card-foreground">
            <h3 className="font-semibold mb-4 text-sm">Visibility</h3>
            <CustomCheckbox 
              checked={onStore} 
              onChange={setOnStore} 
              label="Online store" 
            />
          </div>

          {/* قسم بيانات التخزين (Storage details) */}
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm text-card-foreground">
            <h3 className="font-semibold mb-4 text-sm">Storage details</h3>
            <div className="space-y-3">
              <input type="text" placeholder="SKU" className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
              <input type="text" placeholder="Barcode" className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
              <input type="text" placeholder="Weight" className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
            </div>
          </div>

          {/* قسم تتبع المخزون (Inventory) */}
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm text-card-foreground">
            <h3 className="font-semibold mb-4 text-sm">Inventory</h3>
            <div className="space-y-3">
              <CustomCheckbox 
                checked={trackInventory} 
                onChange={setTrackInventory} 
                label="Track inventory" 
              />
              <input type="number" name="stock" defaultValue="1" placeholder="Add inventory" className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" />
            </div>
          </div>

          {/* قسم التصنيف الجانبي (Category) */}
          <SectionCard title="Category" defaultOpen={true}>
            <div className="mt-2 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search categories" 
                  className="w-full pl-9 pr-3 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" 
                />
              </div>
              <button type="button" className="flex items-center gap-1 text-[#ff2d55] text-xs font-medium hover:underline">
                <Plus className="w-3 h-3" /> Add a new category
              </button>
            </div>
          </SectionCard>

          {/* قسم الموردين (Vendors) */}
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm text-card-foreground">
            <h3 className="font-semibold mb-4 text-sm">Vendors</h3>
            <input 
              type="text" 
              placeholder="Type in (comma separated)" 
              className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/20 focus:border-[#ff2d55] transition-all" 
            />
          </div>

        </div>
      </div>

      {/* ================= الشريط العائم الثابت لزر الحفظ (Fixed Bottom Action Bar) ================= */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background/80 backdrop-blur-md z-50 flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-4 md:px-8">
        <div className="w-full max-w-[1400px] mx-auto flex justify-end">
          <button type="submit" disabled={isPending} className="flex items-center gap-2 px-8 py-2.5 bg-[#ff2d55] text-white font-medium rounded-md hover:bg-[#e6224c] transition-colors shadow-md disabled:opacity-50">
            <Save className="w-4 h-4" /> {isPending ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </form>
  )
}
