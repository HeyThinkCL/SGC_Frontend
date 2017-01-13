import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root.component';

import { AppComponent } from './app.component';

//Login
import { LoginComponent } from './components/login/login.component';

//Dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Sistema
////Colegios
import { ColegiosComponent } from './components/sistema/ficha/colegios/colegios.component';
import { CrearColegioComponent } from './components/sistema/ficha/colegios/crear-colegio/crear-colegio.component';
import { EditarColegioComponent } from './components/sistema/ficha/colegios/editar-colegio/editar-colegio.component';
import { VerColegioComponent } from './components/sistema/ficha/colegios/ver-colegio/ver-colegio.component';
import { ColegioDetailComponent } from './components/sistema/ficha/colegios/colegio-detail/colegio-detail.component';
////Matriculas
import { MatriculaComponent } from './components/sistema/ficha/matricula/matricula.component';
import { CrearMatriculaComponent } from './components/sistema/ficha/matricula/crear-matricula/crear-matricula.component';
import { EditarMatriculaComponent } from './components/sistema/ficha/matricula/editar-matricula/editar-matricula.component';
import { VerMatriculaComponent } from './components/sistema/ficha/matricula/ver-matricula/ver-matricula.component';
import { MatriculaDetailComponent } from './components/sistema/ficha/matricula/matricula-detail/matricula-detail.component';

//Libros
import { CursosComponent } from './components/libros/cursos/cursos.component';
import { CrearCursoComponent } from './components/libros/cursos/crear-curso/crear-curso.component';
import { VerCursoComponent } from './components/libros/cursos/ver-curso/ver-curso.component';
import { ModificarCursoComponent } from './components/libros/cursos/modificar-curso/modificar-curso.component';
import { CursoDetailComponent } from './components/libros/cursos/curso-detail/curso-detail.component';
////Lista
import { CursoListaComponent } from './components/libros/cursos/curso-lista/curso-lista.component';
////Notas
import { CursoNotasComponent } from './components/libros/cursos/curso-notas/curso-notas.component';
import { CursoNotasVerComponent } from './components/libros/cursos/curso-notas/curso-notas-ver/curso-notas-ver.component';
import { CursoNotasIngresarComponent } from './components/libros/cursos/curso-notas/curso-notas-ingresar/curso-notas-ingresar.component';
////Asistencia
import { CursoAsistenciaComponent } from './components/libros/cursos/curso-asistencia/curso-asistencia.component';
import { CursoAsistenciaVerComponent } from './components/libros/cursos/curso-asistencia/curso-asistencia-ver/curso-asistencia-ver.component';
import { CursoAsistenciaIngresarComponent } from './components/libros/cursos/curso-asistencia/curso-asistencia-ingresar/curso-asistencia-ingresar.component';
////Anotaciones
import { CursoAnotacionesComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones.component';
import { CursoAnotacionesVerComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones-ver/curso-anotaciones-ver.component';
import { CursoAnotacionesIngresarComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones-ingresar/curso-anotaciones-ingresar.component';
import { CursoAnotacionesVerGenComponent } from './components/libros/cursos/curso-anotaciones/curso-anotaciones-ver-gen/curso-anotaciones-ver-gen.component';
////Asignar Profesor
import { AsignarProfComponent } from './components/libros/cursos/asignar-prof/asignar-prof.component';

//Profesor
import { ProfesorComponent } from './components/libros/profesor/profesor.component';
import { CrearProfesorComponent } from './components/libros/profesor/crear-profesor/crear-profesor.component';

//Documentos
import { DocumentosComponent } from './components/documentos/documentos.component';
import { InformesComponent } from './components/documentos/informes/informes.component';
import { CertificadosComponent } from './components/documentos/certificados/certificados.component';
import { CitacionesComponent } from './components/documentos/citaciones/citaciones.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },

	{ path: 'sistema/ficha/colegios',  component: ColegiosComponent,
    children: [
      { path: '', redirectTo: 'ver-colegios', pathMatch: 'full' },
      { path: 'ver-colegios',  component: VerColegioComponent },
      { path: 'ver-colegios/:id',  component: ColegioDetailComponent },
      { path: 'crear-colegio',  component: CrearColegioComponent },
      { path: 'editar-colegio/:id',  component: EditarColegioComponent },
    ]
	},

  { path: 'sistema/ficha/matriculas',  component: MatriculaComponent,
    children: [
      { path: '', redirectTo: 'ver-matriculas', pathMatch: 'full'},
      { path: 'ver-matriculas',  component: VerMatriculaComponent },
      { path: 'ver-matriculas/:id',  component: MatriculaDetailComponent },
      { path: 'crear-matricula',  component: CrearMatriculaComponent },
      { path: 'editar-matricula/:id',  component: EditarMatriculaComponent },
    ]
  },

  { path: 'libros',  component: CursosComponent,
    children: [
      { path: '', redirectTo: 'ver-cursos', pathMatch: 'full' },
      { path: 'ver-cursos', component: VerCursoComponent },
      { path: 'crear-curso',  component: CrearCursoComponent },
      { path: 'ver-cursos/:id',  component: CursoDetailComponent,
        children: [
          { path:'', redirectTo:'lista',pathMatch: 'full'},
          { path: 'lista', component: CursoListaComponent },
          { path: 'notas', component: CursoNotasComponent,
            children: [
              { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
              { path:'ver', component: CursoNotasVerComponent},
              { path:'ingresar', component: CursoNotasIngresarComponent},
            ]
          },
          { path: 'asistencia', component: CursoAsistenciaComponent,
            children: [
              { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
              { path:'ver', component: CursoAsistenciaVerComponent},
              { path:'ingresar', component: CursoAsistenciaIngresarComponent},
            ]
          },
          { path: 'anotaciones', component: CursoAnotacionesComponent,
            children: [
              { path: '', redirectTo: 'ver' ,pathMatch: 'full' },
              { path:'ver', component: CursoAnotacionesVerComponent},
              { path:'general', component: CursoAnotacionesVerGenComponent},
              { path:'ingresar', component: CursoAnotacionesIngresarComponent},
            ]
          },

        ]
      },
      { path: ':id/asignar-prof',  component: AsignarProfComponent },
      { path: 'editar-curso/:id',  component: ModificarCursoComponent },
      // { path: 'profesor/crear-profesor',  component: CrearProfesorComponent },
    ]
  },
  { path: 'docs', component: DocumentosComponent,
    children: [
      { path: '', redirectTo: 'informes', pathMatch: 'full' },
      { path: 'informes', component: InformesComponent },
      { path: 'certificados', component: CertificadosComponent },
      { path: 'citaciones', component: CitacionesComponent },
    ]
  },
];

const rootRoutes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full'},
  { path: 'app', component: AppComponent, children: routes },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(rootRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
