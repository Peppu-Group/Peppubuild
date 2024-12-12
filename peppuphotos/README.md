# PhotoDrive

PhotoDrive allows you to manage, share, and explore photos right from your Google Drive. PhotoDrive is API first, which means you can incorporate our API into your application to use the features listed below:
Built under the PeppuBuild ecosystem, PhotoDrive provides key functionalities like secure storage, photo sharing, privacy settings for photos and folder segregation, to enhance the way users interact with visual media.

## 🚀 Features
### Secure Storage
Leveraging Google's secure system, be sure that your memories are safe and secure. 

### Photo Sharing
Upload your picture to Google Drive and get a link that you can share across different platforms. URL is suitable for websites, markdown enabled platforms, and social media accounts.

### Collaboration and Privacy
Give people access to your photos as you wish or restrict them. You can mark photos `internal`, which means they won't showup for external use or you can mark them `external`, allowing them to be shown in public. With collaboration access, people you trust can delete and edit your photos.

### Educational Integration
Seamlessly integrate photos into educational tools like presentations or online learning modules.

### Folder Segregation
Arrange images from memorable events into one folder, so that all your images are arranged in one place. Share with your pals in one click.

## 🎯 Use Cases
**Creative Projects:** Perfect for designers, photographers, and content creators who want a streamlined photo workflow.
**Education:** Enhance classroom learning by incorporating visual aids and collaborative photo assignments.
**Personal Use:** Safeguard and organize family memories with user-friendly tools.
**Team Collaboration:** Share and work on photo collections with teams for marketing, education, or creative campaigns.

## 🌟 Why Choose PhotoDrive?
- User-friendly interface designed for beginners and professionals alike.
- Accessible from any device through a secure web platform.
- Integrated with the PeppuBuild ecosystem for added functionality.

## 📖 Getting Started
1. Sign Up: Visit PhotoDrive to create your free account.
2. Upload Your Photos: Drag-and-drop or import photos from other platforms.
Explore Features: Dive into our organizational features, and sharing options.

## 🛠️ Installation (Optional Section for Developers)

```
# Clone this repository
git clone https://github.com/Peppu-Group/Peppubuild.git

# Navigate to the project directory
cd Peppubuild/peppuphotos

# Install dependencies
npm install

# Create .env file and add environmental variables
APIKEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
URL=http://localhost:1423 // replace with your url

# Run the development server
npm start

# Navigate to your url via your browser
```
📦 Built With
Frameworks/Tools: NodeJs/ExpressJs.
Templating: EJS.
APIs: Google Drive API

## 🤝 Contributing
We welcome contributions! Here's how you can get involved:

1. Fork the repository.
2. Create a new feature branch.
3. Submit a pull request with a detailed explanation.

## 📧 Support
Have questions or need help? Reach out at contact@peppubuild.com.

## 📝 License
This project is licensed under the MIT License.

## Available APIs
| API                                                | Description                                       |
|----------------------------------------------------|---------------------------------------------------|
| photodrive.peppubuild.com/uploadfile/:accesstoken  | Upload an image to your Google Drive's Home Page. |
