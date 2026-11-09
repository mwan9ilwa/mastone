# Website management guide

This guide covers signing in to the Mastone website dashboard and updating the
content shown on the public website.

## 1. Sign in

1. Open `https://your-site-domain/admin` in a browser. For local development,
   start the site with `npm run dev` and open `http://localhost:3000/admin`.
2. Enter the dashboard password and select **Sign in**.
3. If you are not signed in, the dashboard sends you to `/admin/login`.
   A successful sign-in lasts for up to seven days on that browser.

The password is supplied by the site administrator through the site's
environment configuration (`ADMIN_PASSWORD`). There is no password reset or
account creation form in the dashboard; ask the site administrator if you do
not have the password or it needs changing.

## 2. Find a section

The dashboard overview shows the editable areas. Select a card or use the
navigation to open one:

| Dashboard section | What it controls |
| --- | --- |
| **Company details** | Company name and tagline, contact numbers, WhatsApp, email, Facebook page, map links and address |
| **Hero slides** | The rotating banner at the top of the home page, including its text, layout and imagery |
| **Products** | Product categories and products within each category, including models, enquiry numbers, images and specifications |
| **Brands** | Partner names and logos in the brand strip |
| **About** | Company profile paragraphs, highlights and statistics |
| **Services** | The service cards on the home page |
| **Industries** | The industry showcase cards, including their icons and images |
| **Showcase** | Project photos and videos on the home page |
| **Testimonials** | Customer quotes and optional customer details or photos |

Section headings and the parallax banner wording are maintained in the website
code, not in the dashboard.

## 3. Edit, save or discard

1. Open the section you want to update and edit its fields. For repeatable
   content such as slides, products, brands, highlights or services, use the
   add, remove and move controls. Products are nested inside their categories.
2. Select **Save changes**. The dashboard checks required fields and formats;
   if something needs attention, it shows validation errors at the top of the
   section.
3. When the dashboard confirms **Saved**, the public site has been updated.
   Select **View site** to open it in a separate tab and check the result.
4. To undo edits made since the last save, select **Discard**. It is shown
   only when there are unsaved changes.

Unsaved edits are not published. If you try to leave a section with unsaved
changes, the browser warns you. **Restore original** is different from
**Discard**: it resets that entire section to the website's original content
and removes its saved custom version. Confirm the prompt only when you intend
to do this.

## 4. Images

For an image field, either:

- enter the path of an existing site image, such as
  `/images/products/excavator.png`; or
- select **Upload image** and choose a PNG, JPG, WebP, AVIF or GIF image up to
  4 MB.

The preview helps confirm the selected image. Use **Clear** to remove the image
from the field. Uploads are stored by the website and get a `/media/...` URL;
the section itself still needs to be saved for that image choice to appear on
the public site. SVG uploads are not supported. Keep image files reasonably
small so pages load well, especially on mobile connections.

## 5. Section-specific tips

- **Company details:** WhatsApp must be entered as digits only, including the
  country code (8–15 digits, for example `260979106666`). The phone field is
  for display; the WhatsApp field powers WhatsApp enquiries. The Google Maps
  link and map location are separate: the former is the destination of map
  links, while the latter sets the map's displayed location.
- **Hero slides:** choose either a full-width photo or a product cut-out
  layout. Product slides can also have a second image and backdrop word.
- **Products:** a category can have its own enquiry number; an individual
  product's number overrides the category number. If neither is set, enquiries
  use the company's WhatsApp number. Add useful model/type text and
  specifications so customers can identify the equipment.
- **About:** wrap words in `**double asterisks**` to make them bold.
  Statistics can show thousands separators; turn that off for values such as
  years.
- **Services and industries:** select an icon from the available list.
  Industries also need an image.
- **Showcase:** add photos using the image uploader; visitors can open each
  photo in a full-screen viewer and navigate between photos. For videos, paste
  a YouTube, Vimeo, Dailymotion, Facebook, TikTok, Instagram, Rumble, Loom,
  Wistia or Streamable link, or a direct MP4/WebM URL. An optional poster image
  appears before playback for direct video files. The site does not upload
  video files.
- **Testimonials:** add customer feedback and the customer's name. Position,
  company and photo are optional.

Adding or renaming a product or category affects its automatically generated
catalogue page URL. Avoid renaming published items after they have been
indexed by search engines; see the URL guidance in [the SEO guide](./SEO.md).

## 6. Finish safely

Use **View website** in the dashboard navigation to return to the public
homepage. Select **Sign out** when you are finished, especially on a shared
computer. On smaller screens the dashboard navigation is horizontally
scrollable and the sign-out control is in its header.

If a save fails, read the validation message, correct the listed field and
save again. If the problem persists or the site is unavailable, contact the
site administrator rather than repeatedly restoring the section.
