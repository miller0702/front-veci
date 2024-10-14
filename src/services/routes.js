import RecargasPage from '../components/Recargas/RecargaPage';
import Dashboard from '../components/Layout/Dashboard';
import PDFViewer from '../components/Layout/PDFViewer';

export const routes = [
  { text: 'Home', path: '/dashboard', component: Dashboard },
  { text: 'Recargas', path: '/recargas', component: RecargasPage },
  { text: 'PDF', path: '/pdf/:id', component: PDFViewer },
];
