
import { create } from 'zustand'
export const useStore = create(set => ({
  lang: 'en', setLang: l => set({ lang: l }),
  selectedIso3: null, setSelectedIso3: iso3 => set({ selectedIso3: iso3 }),
  selectedCohort: 'all', setSelectedCohort: c => set({ selectedCohort: c }),
  selectedCategory: 'Electricity Access', setSelectedCategory: c => set({ selectedCategory: c }),
  selectedIndKey: 'elec_access_current', setSelectedIndKey: k => set({ selectedIndKey: k }),
  displayMode: 'current', setDisplayMode: m => set({ displayMode: m }),
}))
