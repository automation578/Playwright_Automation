# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: RadioButtons.spec.js >> handle radio button
- Location: tests\RadioButtons.spec.js:4:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('//input[@value=\'option2\']')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - link [ref=e4]:
      - /url: https://demoqa.com
      - img [ref=e5]
  - generic [ref=e8]:
    - generic [ref=e11]:
      - generic [ref=e14] [cursor=pointer]:
        - generic [ref=e15]:
          - img [ref=e17]
          - text: Elements
        - img [ref=e22]
      - generic [ref=e24]:
        - generic [ref=e26] [cursor=pointer]:
          - generic [ref=e27]:
            - img [ref=e29]
            - text: Forms
          - img [ref=e35]
        - list [ref=e38]:
          - listitem [ref=e39] [cursor=pointer]:
            - link "Practice Form" [ref=e40]:
              - /url: /automation-practice-form
              - img [ref=e41]
              - text: Practice Form
      - generic [ref=e45] [cursor=pointer]:
        - generic [ref=e46]:
          - img [ref=e48]
          - text: Alerts, Frame & Windows
        - img [ref=e53]
      - generic [ref=e57] [cursor=pointer]:
        - generic [ref=e58]:
          - img [ref=e60]
          - text: Widgets
        - img [ref=e66]
      - generic [ref=e70] [cursor=pointer]:
        - generic [ref=e71]:
          - img [ref=e73]
          - text: Interactions
        - img [ref=e78]
      - generic [ref=e82] [cursor=pointer]:
        - generic [ref=e83]:
          - img [ref=e85]
          - text: Book Store Application
        - img [ref=e90]
    - generic [ref=e93]:
      - heading "Practice Form" [level=1] [ref=e94]
      - heading "Student Registration Form" [level=5] [ref=e95]
      - generic [ref=e96]:
        - generic [ref=e97]:
          - generic [ref=e99]: Name
          - textbox "First Name" [ref=e101]
          - textbox "Last Name" [ref=e103]
        - generic [ref=e104]:
          - generic [ref=e106]: Email
          - textbox "name@example.com" [ref=e108]
        - generic [ref=e109]:
          - generic [ref=e110]: Gender
          - generic [ref=e111]:
            - generic [ref=e112]:
              - radio "Male" [ref=e113]
              - generic [ref=e114]: Male
            - generic [ref=e115]:
              - radio "Female" [ref=e116]
              - generic [ref=e117]: Female
            - generic [ref=e118]:
              - radio "Other" [ref=e119]
              - generic [ref=e120]: Other
        - generic [ref=e121]:
          - generic [ref=e123]: Mobile(10 Digits)
          - textbox "Mobile Number" [ref=e125]
        - generic [ref=e126]:
          - generic [ref=e128]: Date of Birth
          - textbox [ref=e132]: 01 May 2026
        - generic [ref=e133]:
          - generic [ref=e135]: Subjects
          - generic [ref=e137]:
            - log [ref=e139]
            - combobox [ref=e143]
        - generic [ref=e146]:
          - generic [ref=e148]: Hobbies
          - generic [ref=e149]:
            - generic [ref=e150]:
              - checkbox "Sports" [ref=e151]
              - generic [ref=e152]: Sports
            - generic [ref=e153]:
              - checkbox "Reading" [ref=e154]
              - generic [ref=e155]: Reading
            - generic [ref=e156]:
              - checkbox "Music" [ref=e157]
              - generic [ref=e158]: Music
        - generic [ref=e159]:
          - generic [ref=e161]: Picture
          - button "Choose File" [ref=e163] [cursor=pointer]
        - generic [ref=e164]:
          - generic [ref=e166]: Current Address
          - textbox "Current Address" [ref=e168]
        - generic [ref=e169]:
          - generic [ref=e171]: State and City
          - generic [ref=e173]:
            - log [ref=e175]
            - generic [ref=e176]:
              - generic [ref=e177]:
                - generic [ref=e178]: Select State
                - combobox [ref=e180]
              - img [ref=e184]
          - generic [ref=e186]:
            - generic:
              - log
              - generic:
                - generic:
                  - generic: Select City
                - generic:
                  - generic:
                    - img
        - button "Submit" [ref=e189] [cursor=pointer]
    - generic [ref=e195]:
      - iframe [ref=e198]:
        - generic [ref=f4e2]:
          - link "Advertisement" [ref=f4e4]:
            - /url: https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjsvFZnSFeVJcyoMijJcSiwESfbpsTLD833wSlCihR9AVSgequDr2JCKPjG0Nmi8TPvws-Yu9g9gvZ1VQ7zj-cssli8ELoper_xyUJX_e9vqbxzTf6XWnm51m1050Vj1KtLSAd4wdQcN2wxDgMPTMFwTz-wD3jVT9A-_Qry3W1xNnr4ZzQozObVeNkBiBGx_LZOpPUTp8fdHuN2JrjU04JG6yeIHdvMw5lZ3EVX9a5HBiqn9b-FQ3rRJmAqhOZ9wvLbIaAbjtAWGfKM7kABfEphjKy14saJyNz3sh1QujEQkM4GUefnEUvziBzeeSrOwhSdYpbBdvB6oPIrbD4VkiNU5qE9FjV-Goij5Ppkmj5MWxxijHAtJjauZzSKc2IZC71vVGoUxeiESPDeFK0TssfbBGwQbDnLLQWYeQwAkgAcsIw_qf2-jruY6TQJMC_n15ij3IaBQ-vVaKMf-uN933Ke3LhllxpypqJ35QJCvfukWwUdlBp5ss67AfTtaZ3bsth0MQD-mIxyBFkdCkGnzloLvc73bGjcNxZwpcrx8SoJxHob3fBEjYHS09SZuQfwyVfFWpZU8FVX7toK-tWMKCjKeTTeer6IGS3iHVd8waXJhRcZnCvSNtRRkS-qZAifiCBRhV9gocXP2Z15JC-Fr3r86l-QQtNAhscfNb22rQZezroW3t0lhiaIo4v_hLLdJBYJXTf_KcvekaJ0qPw_vQC8TP1PnC9gfcl11EhTDayv2P8Wt5ZThpAq_siIqvggAG5FFI_BbmaP8LoUmqOqRq0UO72W33xEdNbpTbNa1jvi5nMh5hJtwweEN0f4TkhXomqqLeKId2G25L2HgowsBeLOl3tALr9qQfdzpLeTfrskp37yKTUMUdzzCqZnDlzweuocsv9jjWfMHlVK_CPa5t9IdhCeFYLY7T3G9MbC6ceE0fRqURDRJYB1SAV0zqGDcJnU1sUC1clnsG77FGimiRdIF-lnECptWNaLJoGyvW8KJsXk4rb7Dp-LQGfgZ36D9haaMVFFHFbDX-1pK8EDSHt7wA3KITCJHyy1VKeF2znglnh43Rso1eIU2r2eR43uDts8vk62iffTOvKzRRJew-7J1UuktvbAB4fJJYH6a_Zu7CO-gGY9BIxN3LfMzjgS1CjESLsDMZfMbzJA3kmFMz-_o3v76tFE6sz5fyit8KWZjS8Mqg8R6ttXmf4tRkNZiRogvf4xeh3H3brP6_U3R4ey2Os8yxf4v_MHYVJfYp90PE3XDrJLXhjPv0789uTKe5MW9vHYoASgFuQxboKzG-84iRTwgfSZkYmgyCBfh_rRQ3bQBJi7DrrrUH9J-gMwEuZgD0ojnYtMjpCUdvnolSXe1Tzsh6ni6Rnn19fmC1kGrlu2ak4lL3b3TrI_-0QOgDOSskrwDLYUQBcs6eP1z94YDsWWgbcjjtPgSCapClUwc_B5y9LHI7udM2y38DKTf9QhkYgS9OU72KcqNR2b8Bsi2SI5et-Kby46WRYtjd5FX0_DbjjlZKDAXLSScDGFzHIQGCADPtTop_dIDQnWZE8_2NwTLdhCe2RBqS4KWf5KBw9qHWIWOOpFewstiXgs0toPo82-nBL9JCDIl9ety3U4oXbjul8cSli7lJFVjOYP5r7Mwa4_fwzhfUWxSKWr-H8lqZhBs4d-c3cdtWzst985Gz8ytLGSGOZhVGALmgoS39zWnpZYQH2Tszvmn7fuWVkX1044ECWdYsitNLmh9EvPjg1V6Q6uomy_60Ar3EI5E7KsGEz6PJftQwfWG2MdhYLSCdzUOMF6IDeyROuHZgKDIPFyeYJV0B0Q9leneP0pm1JChi5-wPHwYWpWngg1bzhpmUkw_FLM23Aykm5XW-fdX3cn8yAnGGM5Im_B2vL-BW4AeqpxBQ0nSNBLWyDqtrhrliaqdORONuFf8lIUq5USjz&sai=AMfl-YSpEuBrv40aWHMZgNASY6O17N39zi5XVMKXO54W7FvszahUWtGKU69mS66som2FE8auXl1AiU8JwdCWe88DjN1DeOsE90eOWH8tZkFPA0vnMd1_AjNnXl5kbidEiTCX6P_R0AMLPUHJ6msvNciI_OrrOVpIiU1Hun3J0nvL0k5-yYrt908ntQl90TxKeUKxuq1Lhg3tMXieDVcPdkydlgzF2IScMnQDY3sSlzoMhK9Ifd_4Ao0RBVVML_EKVpXVD6oRnBfq4IZWcjwaVmt1DXisgk_EZ8v2V__eXjePIkBJ42btUHvu8ux9b08hD8chR5aPDwNOouKK3jxtHgpenGNlpxgEODCXmENqBzPBwAu3AIV4w_uvZt5QTWFrseRiRJPBY_v83Y6uw2dvSKm_iXiY8ICpJhyX-p8rQLsXju-kPL_BjU7NEDQsoiDKx1t-XNT8Z3iRkqRGXQU6eiY5SQ4ncnxgox9h9Df7O4AbNyhwlYYDuMYDOpneqYNPnNXmU8EK1sdtczsuYVKufTvdSrqDq-d5CBGJUZV2IU5B2p7VheVTo6mvqfnwzrEudvxFVRAS772sArntWw2ws5LSoJ-afdB9KX0EVdmU3rtrsELBVNARPcf9HG43lhO35v8gzeac4Cudl_TL6PwaxfzRByoUPNvU1HS9lkc88g0_KxJ53IQmla_CBdKyb_k7aRWVKfgBD3cxF_9PDrX6kDredLVQ9g4uKt0NfxIYnFxmuJYufW4rgU6vKknNHNws6Z3vympdJKHxkzRSxAGiVbhvXSFSRRxRcGkToEpWS4k&sig=Cg0ArKJSzDzUpPzQKCvb&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://bioderma.naosindia.in/collections/photoderm%3Futm_source%3Ddv360%26utm_medium%3Dpaid%26utm_campaign%3Din_bio_dv360_all_always-on_photoderm_na_awareness_photodermp1-display%26utm_content%3Dnative_local_photoderm_inmarket-custom-intent%26dclid%3D%25edclid!%26gad_source%3D7%26gad_campaignid%3D23605415694
            - img "Advertisement" [ref=f4e5]
          - generic [ref=f4e6]:
            - generic:
              - img [ref=f4e10] [cursor=pointer]
              - button [ref=f4e12] [cursor=pointer]:
                - img [ref=f4e13]
      - iframe [ref=e201]:
        - generic [ref=f5e2]:
          - link "Advertisement" [ref=f5e4]:
            - /url: https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjssXIb1iSH1N5GUijCVWmgTTiLBp3CEUp5f_l-ufX8okc_zo_E2SZ-vJlcTGTyFsICEWDMy6s0NquT5Iikt-Neg1MJ2LixZMWal-09iOhX1zJkyPoQrKNG0bNHdhsNLbAR6rRufalDH2wG67pQXCleadbzQgMJlwGssvJdh5nK6Qbf4yl1I4w5ogmb1GAsK6Uktch0HfQC0wpV_bryhoO5YRjeFrP-JmnihWdGsZBpNusezUZoqZif8dyc8t34QD34nbJQfavVOX0v97ANqk1jpk761iBk4KqgnMxegg2fKWjtJVT9dmxXPEKglaYThjaBc0Kdd-b7wbJioJem37n7YSz3Ac37cQS8wahEQ48HRzU0qsd2xULN6EGnzYYEHF81zCbFvcIJ1VxCn0xYShLOkZngxsnd5oVTenl2QfhXdcTX3pI3e56_jkYhl7d1_2Cd-JXruLu6v7lNmC6Z2IvBHBOvvIcEOtipLtUTTKGWo_wI8C50E_A0LZQTT-ITeyaWaJIEFv9rRQoKXnqf4RpXS2BDQn-m_oUqPPy5mAYZW4iv7-XYMWRq5PdpIKmOk6qE1HNc-L7A_1RtlmowySevw-MTe9u4EBL7jhGaNG7mxMKWk5yUxHhrscm90fnJEVL4jKU7KVjqIqtk83grnCPEcWpy1a0X8eMBVITn3LXd9FdRifePHo2bODvcwSPgjmoLLjr5LJqg7p8GpOEI2625igcV8RqjbHDotkl-mSeSMZU97EiNSRPCLnZBXngmODJ1PhWyZfGcw9WnOZ0R1tHCqJNd301vCbZjlyOJFmh8ZkAndh5KouXTJCsVKKG9Bso0bsBGMvfAwR3II3iDYSTK3x6NtYtepd04S7WdodsJScQ-gqpetEOdr1C8P1HlHdD3A6zIvbLbsNxPrK3jGpG67HWLspQVNpOPGWy0QiQxUZisDL68rWGo9w-y6xLliqscSZR1LHPDcMWR9BpH59lNoTe2sjh34tz8W9hKD6MKp1fhFITNUooRqLY_iOTG5-rzkrjwWlYWX_M8jR9wOD3qsVa8VuZDX4MCrIGeaxXRr3r3JyxtwqMu3Sjn-UHSOA6i-w_JRX6aZvknQPneUzSFiJ0yhxq9q1SMb0E_Cr1x6z4E5I4MDmrahl2FIXwc74HKC3NXIXUPShW4R_vWZBRqJdzoUBIIcypz39IpQa9uxQXHmALyWfetJ_9XmGpd5_dXKRcQwRi75wR1no5TVpWfGqYUVV6FbrY81kZhiOLjauTLGcM1giAxMhqbgOfaau4fwsqcJd5GqPshlejYpaikxS9_Io2xHQHsPJhUQRhYoPA1CRJ85GuehazMIXSsunTyE86BsXqeOSBSZq_HeIxTJoiqtjm_IoLXuC8KGtAiRheXkgFTCIW5I8uguUMOPlgrIM3NbJbPGQQcc1NpSBcOSkN0qU2FJsIEXiCg_Sl5JCYn2RJw7QB1p7pRGAcn1lAHhsfRLLCzemn2VdjxCsFDgso9xmu3Ff-Y3b1Y278VynylulQ2qYnOLj696k70j_dUIkpfZ9-ZpWfg8NFyyyWEjVV3UBN5zI5Z9ytrJ2IjBffcqs4u94VKLGZsxcVUHqnD8QgRDaoBJAp8uj3-V1GOOYdfo-UB0R4EPVOzdfYDvnYsa9YMUJRDQ4wATdnRaZjqhCyYAUcfCU-Za-nweXNRmYUdLdEXOcRft7DcFflMOMlQ1chA-hyjO9nttl-_g947yKjKXCY-eKvUSVfcRwhbqsgwbjY3bDFucOS4_CWezp_w2OWpft1LeAN7JY5nseF8ctbSpFnjAPEGPlMU6SBtOYBGV7wf1AO56b8G5Bd9k0Ums9SjnogMaTiHiCfSR3nFccnGGjUqI2mm_vatVponlXJonqkxXYRbp3iyQyn4R7imCdRJxP9kRmxU_-wCzUQ0pKUEZ7S7csym9GEU6IKZgk&sai=AMfl-YSCsIyu_eiTGYRudJhdVh0WToJNVHt_iuuhlt15a1hYCuF1GTkHZwkizl-fpLW_61CUvOF5CJ3b-Uj4_ylxqyJmRDokQBdKLs2nUGL-p2D0J7t3r5YYhOTko_TARbcn8TnIjvMXH0pGgqbkmimt4lmx2rDGbavHxY0b_E72f84chcC1nah9KLkPGwGKxxWAWtnXc7XW5xuziaZHCUMwH1bbHmY-ewZmN5bGuiktzcSvjAddJ39TRPaWyGLZF8WHOk6Zg1dSZ4sN-AJ-AzOVtsCDz5m3lXqArXjY1m8TyM4OOhNhCu3hiMgxJ_AG0pz5bOR0f1ZLPI9TWKG297YaLU6OhBneBuCEHK1nHbeDqGua8vfVfvNL_uUjNwjkLm-2bIhzHgZ7Aj0KSBlggGE21xVXr6eKPMkEUZ8YCNhcNy9uNws-MQnSmM1WniafHTnAMAi7zukOie9eo1DI7eIeppJtGbgQm6ia5yC00PZqfl3LetQyg4YxrAK9iAidbJJ4-J-TbVHGeuzTp2oS1ZzBA8_CUxyZJAcRNbYzf8XmkSe_gS-cPfaUPwnlC_eCoYqODOfNOcvAGtCgoDO_O5AmtabyArAbByUIeWWPiFI5R-0SygOApLTBH21u31awaZfTScTuY7C9uYLHsD-dhIjVacU9Xn3GZJYoP7as4ucFDtbguDCbqw5mhWrhvgBh0JRFeOHwECbqaeoBHGRb0z8-enscZ4gSmffWxKK8yCI2qXLJkK3dob8MEDJV1jIKcm8y0QRuvIa3SvnCtPVhAowLNQ96XMe8-Hu1mAqwh_0&sig=Cg0ArKJSzFtrEwGH_Haw&fbs_aeid=%5Bgw_fbsaeid%5D&urlfix=1&adurl=https://bioderma.naosindia.in/collections/photoderm%3Futm_source%3Ddv360%26utm_medium%3Dpaid%26utm_campaign%3Din_bio_dv360_all_always-on_photoderm_na_awareness_photodermp1-display%26utm_content%3Dnative_local_photoderm_inmarket-custom-intent%26dclid%3D%25edclid!%26gad_source%3D7%26gad_campaignid%3D23605415694
            - img "Advertisement" [ref=f5e5]
          - generic [ref=f5e6]:
            - generic:
              - img [ref=f5e10] [cursor=pointer]
              - button [ref=f5e12] [cursor=pointer]:
                - img [ref=f5e13]
  - contentinfo [ref=e202]:
    - generic [ref=e203]: © 2013-2026 TOOLSQA.COM | ALL RIGHTS RESERVED.
```

# Test source

```ts
  1  | class RadioButtonsPage {
  2  |     constructor(page) {
  3  |         this.page = page;
  4  |         this.url = 'https://demoqa.com/automation-practice-form';        this.maleRadioButton = page.locator("//input[@value='option2']");
  5  |         this.femaleRadioButton = page.locator("//input[@value='option1']");
  6  |     }
  7  |     maleRadioButtonCheck() {
> 8  |         return this.maleRadioButton.check();
     |                                     ^ Error: locator.check: Test timeout of 30000ms exceeded.
  9  |     }
  10 |     isMaleRadioButtonChecked() {
  11 |         return this.maleRadioButton.isChecked();
  12 |     }
  13 |     isFemaleRadioButtonChecked() {
  14 |         return this.femaleRadioButton.isChecked();
  15 |     }
  16 |     async navigate() {
  17 |         await this.page.goto(this.url);
  18 |     }
  19 | }
  20 | module.exports = { RadioButtonsPage };
```