# Image Sources & Licensing Record

Every externally-sourced image currently used on the public site, drawn
from `src/content/image-sources.ts` (the single source of truth — update
that file and this table together). All images below were verified during
research to be genuinely reusable; do not add an image to the site without
adding a matching, license-checked entry here first.

| Asset | Source | Creator | License | Attribution shown on site? |
|---|---|---|---|---|
| Kabir weaving at his loom (Jaipur Central Museum, c. 1825) | [commons.wikimedia.org/wiki/File:Kabir004.jpg](https://commons.wikimedia.org/wiki/File:Kabir004.jpg) | Unknown artist | Public Domain | No (PD, not required) |
| Kabir with Ravidas, Mughal-style painting, 1625 | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Painting_of_Kabir_with_Ravidas,_Mughal,_1625.jpg) | Unknown artist | Public Domain | No |
| Bhagat Kabir in a gathering of holy men of different faiths (Mir Kalan Khan, c. 1770–75) | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Detail_of_Bhagat_Kabir_from_a_painting_of_a_gathering_of_holy_men_of_different_faiths,_by_Mir_Kalan_Khan,_ca.1770-75.jpg) | Mir Kalan Khan | CC0 1.0 | No |
| Kabir seated at his loom, Amber school, c. 1750–1800 | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Painting_of_Kabir,_Amber,_ca.1750-1800.jpg) | Qa'im Khan Bin Zafar Bahadur | Public Domain | No |
| Bhagat Kabir with a disciple, Mughal school of art | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Painting_of_bhagat_(saint)_Kabir_(left)_with_a_disciple_(right),_Mughal_school_of_art.jpg) | Unknown artist | Public Domain | No |
| Bhagat Kabir with son Kamal and disciples Surat Gopal & Dharam Das | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Painting_of_bhagat_Kabir_(seated_near_the_centre_of_the_frame),_his_son_Kamal_(fly-whisk_attendant;_standing_to_the_right),_and_two_of_his_disciples_Surat_Gopal_(seated_left)_and_Dharam_Das_(seated_right).jpg) | Unknown (from R.V. Russell, *Tribes and Castes of the Central Provinces of India*) | Public Domain | No |
| Sant Kabir Das Ji — contemporary digital illustration | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Kabir_Das.jpg) | ShubhamSay | **CC BY-SA 4.0** | **Yes** — creator credited in caption |
| Samadhi and Mazar at Maghar (view 1) | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Kabir-Samadhi-and-Majar-at-Magahar-01.jpg) | सत्यम् मिश्र (User:SM7) | **CC BY-SA 4.0** | **Yes** |
| Dargah (under restoration) and Samadhi at Maghar (view 2) | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Kabir-Samadhi-and-Majar-at-Magahar-02.jpg) | सत्यम् मिश्र (User:SM7) | **CC BY-SA 4.0** | **Yes** |
| Sant Kabir's Sadhna Gupha (meditation cave), view 1 | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Kabir's-Sadhana-Gupha-01.jpg) | सत्यम् मिश्र (User:SM7) | **CC BY-SA 4.0** | **Yes** |
| Front of the Sadhna Gupha, view 2 | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Kabir's-Sadhana-Gupha-02.jpg) | सत्यम् मिश्र (User:SM7) | **CC BY-SA 4.0** | **Yes** |
| Information board at the Sadhna Gupha (UP State Archaeology Dept.) | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Information-Board-at-Kabir's-Sadhana-Gupha-Maghar.jpg) | सत्यम् मिश्र (User:SM7) | **CC BY-SA 4.0** | **Yes** |
| Aami River at Maghar | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Aami-river-at-Maghar.jpg) | सत्यम् मिश्र (User:SM7) | **CC BY-SA 4.0** | **Yes** |
| Kabir Chaura Maghar complex (Wiki Loves Monuments) | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:KABIR_CHAURA_MAGHAR_UP_INDIA_PIN272173.jpg) | Badre Alam Khan | **CC BY-SA 3.0** | **Yes** |
| Sadguru Kabir Samadhi Sthali, Maghar | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:SADGURU_KABIR_SAMADHI_STHALI.JPG) | Mahantvicharsaheb | **CC BY-SA 4.0** | **Yes** |

All images are served directly from `upload.wikimedia.org` (allowlisted in
`next.config.ts` `images.remotePatterns`) via the `<AttributedImage>`
component (`src/components/ui/AttributedImage.tsx`), which automatically
renders the required creator/license caption for every CC-licensed image
and omits it for public-domain ones (where attribution is legally optional,
though the source is still recorded here for transparency).

## Government (.gov.in / .nic.in) images — found, but NOT used

The Sant Kabir Nagar and Gorakhpur district government websites host
photographs of Maghar, but their stated reuse policy requires **emailing
the district administration for permission first** — there is no open/CC
license. These were therefore not used. If the organisation obtains that
permission, they can be added to this table and to `image-sources.ts`.

## Explicitly avoided

Per the project's copyright discipline, the following were found during
research but deliberately NOT used:

- Newspaper/press photographs (even where they appear in search results)
- Any photograph of Mahant Vichar Das Ji — no clearly rights-cleared,
  high-resolution portrait could be found (see `CONTENT_REQUIRED.md`)
- Travel-blog and unlicensed stock-site photographs
- Any Adobe Scene7-hosted image from incredibleindia.gov.in (Ministry of
  Tourism copyright reserved, no explicit reuse grant found)
- A Government of India postage stamp depicting Kabir — Indian government
  works carry their own copyright term; status not confirmed as free

## Logo

No official logo could be confirmed as available/authorised for use during
research. `src/components/ui/Logo.tsx` is an original wordmark + simple
abstract lotus/flame SVG mark, created for this project — not presented
anywhere as an official existing logo. Replace via `CONTENT_REQUIRED.md`
item 1 once a real, authorised logo is supplied.
