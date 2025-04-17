# 🎨 Critical Thinking Dialogue System - Frontend

The frontend implementation of the Critical Thinking Dialogue System, built with React and Material-UI, featuring a Persian (Farsi) interface with RTL support.

## 🏗️ Architecture

- **Framework**: React 18
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **State Management**: React Context API
- **Styling**: CSS-in-JS with MUI's styled-components
- **Language**: Persian (Farsi) with RTL support

## 📦 Key Components

- **HomePage**: Landing page with model selection and guidelines
- **ChatInterface**: Main conversation interface
- **MessageList**: Message history display
- **InputArea**: User input handling
- **ModelSelector**: Model selection dropdown
- **LoadingIndicator**: Loading states and animations

## 🎯 Features

- **Responsive Design**: Works on desktop and mobile devices
- **RTL Support**: Full support for Persian text direction
- **Model Selection**: Easy switching between different reasoning models
- **Real-time Updates**: Live conversation updates
- **Error Handling**: Graceful error states and user feedback
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

### Development

Start the development server:
```bash
npm start
```

### Building for Production

Create a production build:
```bash
npm run build
```

Serve the production build:
```bash
npx serve -s build
```

## 🎨 UI/UX Guidelines

- **Colors**: Using MUI's default theme with custom Persian typography
- **Typography**: Vazirmatn font for Persian text
- **Layout**: Responsive grid system
- **Spacing**: Consistent 8px grid
- **Animations**: Subtle transitions for better UX

## 🔧 Configuration

### Environment Variables

- `REACT_APP_API_URL`: Backend API endpoint
- `REACT_APP_DEFAULT_LANGUAGE`: Default language code (`fa`)

### Theme Customization

The theme can be customized in `src/theme.js`:
- Colors
- Typography
- Spacing
- Breakpoints
- RTL settings

## 🐛 Debugging

- Use React Developer Tools
- Check browser console for errors
- Monitor network requests
- Use MUI's theme debugger

## 📱 Responsive Breakpoints

- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 🔍 Testing

Run tests:
```bash
npm test
```

## 📚 Documentation

- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

MIT License. See the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- Vazirmatn font creators for Persian typography
- All contributors to the project 