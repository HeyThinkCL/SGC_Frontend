import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { Select2Module } from 'ng2-select2';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Ng2DatetimePickerModule, Ng2Datetime } from 'ng2-datetime-picker';
import { MomentModule } from 'angular2-moment';
import './rxjs-extensions';

//pipes
import { FilterCursoProf } from './pipes/filter-curso-prof.pipe';
import { CalcPromedio } from './pipes/calc-promedio.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { AbbreviatePipe } from './pipes/abbreviate.pipe'
import {FilterTablePipe} from "./pipes/filter-table.pipe";
import {Select2WidthFixPipe } from "./pipes/select2-width-fix.pipe"
import {FilterProfByAsign } from "./pipes/filter-prof-asignatura"
import {FilterAsignaturas } from "./pipes/filter-asignaturas"

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { LoginComponent } from './components/login/login.component';

//Dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

//Sistema
////Colegios
import { ColegiosComponent } from './components/sistema/colegios/colegios.component';
import { CrearColegioComponent } from './components/sistema/colegios/crear-colegio/crear-colegio.component';
import { EditarColegioComponent } from './components/sistema/colegios/editar-colegio/editar-colegio.component';
import { VerColegioComponent } from './components/sistema/colegios/ver-colegio/ver-colegio.component';
import { ColegioDetailComponent } from './components/sistema/colegios/colegio-detail/colegio-detail.component';
////Matriculas
import { MatriculaComponent } from './components/sistema/matricula/matricula.component';
import { CrearMatriculaComponent } from './components/sistema/matricula/crear-matricula/crear-matricula.component';
import { EditarMatriculaComponent } from './components/sistema/matricula/editar-matricula/editar-matricula.component';
import { VerMatriculaComponent } from './components/sistema/matricula/ver-matricula/ver-matricula.component';
import { MatriculaDetailComponent } from './components/sistema/matricula/matricula-detail/matricula-detail.component';
////Postulaciones
import { PostulacionesComponent } from './components/sistema/postulaciones/postulaciones.component';
import { PostulacionDetailComponent } from './components/sistema/postulaciones/postulacion-detail/postulacion-detail.component';
import { CrearPostulacionComponent } from './components/sistema/postulaciones/crear-postulacion/crear-postulacion.component';
import { ModificarPostulacionComponent } from './components/sistema/postulaciones/modificar-postulacion/modificar-postulacion.component';
import { PostulacionesDashboardComponent } from './components/sistema/postulaciones/postulaciones-dashboard/postulaciones-dashboard.component';
import { VerPostulacionesComponent } from './components/sistema/postulaciones/ver-postulaciones/ver-postulaciones.component';
import { PostulacionesAceptadasComponent } from './components/sistema/postulaciones/postulaciones-aceptadas/postulaciones-aceptadas.component';
import { PostulacionesRechazadasComponent } from './components/sistema/postulaciones/postulaciones-rechazadas/postulaciones-rechazadas.component';
import { PostulacionesEsperaComponent } from './components/sistema/postulaciones/postulaciones-espera/postulaciones-espera.component';

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
import { AsignarProfesorACursoComponent } from './components/libros/cursos/asignar-profesor-a-curso/asignar-profesor-a-curso.component';

//Cierre de Año
import { CierreAnnoComponent } from './components/cierre-anno/cierre-anno.component';

//Profesor
import { ProfesoresComponent } from './components/libros/profesores/profesores.component';
import { VerProfesoresComponent } from './components/libros/profesores/ver-profesores/ver-profesores.component';
import { AsignarProfesorComponent } from './components/libros/profesores/asignar-profesor/asignar-profesor.component';

//Documentos
import { DocumentosComponent } from './components/documentos/documentos.component';
import { InformesComponent } from './components/documentos/informes/informes.component';
import { CertificadosComponent } from './components/documentos/certificados/certificados.component';
import { CitacionesComponent } from './components/documentos/citaciones/citaciones.component';
import { ByTipoEnsenanzaComponent } from './components/documentos/filtros/by-tipo-ensenanza/by-tipo-ensenanza.component';
import { ByGradoComponent } from './components/documentos/filtros/by-grado/by-grado.component';
import { ByCursoComponent } from './components/documentos/filtros/by-curso/by-curso.component';
import { ByAlumnoComponent } from './components/documentos/filtros/by-alumno/by-alumno.component';

//Funcionarios
import { FuncionariosComponent } from './components/sistema/funcionarios/funcionarios.component';
import { CrearFuncionarioComponent } from './components/sistema/funcionarios/crear-funcionario/crear-funcionario.component';
import { VerFuncionariosComponent } from './components/sistema/funcionarios/ver-funcionarios/ver-funcionarios.component';
import { FuncionarioDetailComponent } from './components/sistema/funcionarios/funcionario-detail/funcionario-detail.component';
import { EditarFuncionarioComponent } from './components/sistema/funcionarios/editar-funcionario/editar-funcionario.component';

//Configuracion
import { ConfiguracionComponent } from './components/sistema/configuracion/configuracion.component';
import { ConfiguracionDashboardComponent } from './components/sistema/configuracion/configuracion-dashboard/configuracion-dashboard.component';
import { CalendarioAcademicoComponent } from './components/sistema/configuracion/calendario-academico/calendario-academico.component';
import { NotasPonderacionesComponent } from './components/sistema/configuracion/notas-ponderaciones/notas-ponderaciones.component';
import { JornadaComponent } from './components/sistema/configuracion/jornada/jornada.component';
import { ConfiguracionCursosComponent } from './components/sistema/configuracion/configuracion-cursos/configuracion-cursos.component';

//Servicios
import { MatriculaService } from "./services/sistema/matricula.service";
import {ColegiosService } from './services/sistema/colegios.service';
import {CursosService} from "./services/libros/cursos.service";
import {ProfesoresService} from "./services/libros/profesores.service";
import {AsignaturasService} from "./services/libros/asignaturas.service";
import {NotasService} from "./services/libros/notas.service";
import {AnotacionesService} from './services/libros/anotaciones.service';
import {DpaService} from './services/sistema/dpa.service';
import {EtniasService} from './services/sistema/etnias.service';
import {EstadosCivilesService} from './services/sistema/estados-civiles.service'
import {PostulacionesService} from './services/sistema/postulaciones.service';
import {ApoderadosService} from './services/sistema/apoderados.service';
import {FuncionariosService} from './services/sistema/funcionarios.service';
import {ConfiguracionService} from './services/sistema/configuracion.service';
import {CalendarioService} from './services/sistema/configuraciones/calendario.service';
import {ConfigNotasService} from './services/sistema/configuraciones/config-notas.service';
import {AsistenciaService} from "./services/libros/asistencia.service";
import {PlanDeEstudiosService} from './services/sistema/plan-de-estudios.service';

@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ColegiosComponent,
    CrearColegioComponent,
    EditarColegioComponent,
    MatriculaComponent,
    CrearMatriculaComponent,
    EditarMatriculaComponent,
    VerColegioComponent,
    VerMatriculaComponent,
    CursosComponent,
    CrearCursoComponent,
    VerCursoComponent,
    ModificarCursoComponent,
    ProfesoresComponent,
    AsignarProfesorACursoComponent,
    ColegioDetailComponent,
    MatriculaDetailComponent,
    CursoDetailComponent,
    CursoNotasComponent,
    CursoListaComponent,
    CursoAsistenciaComponent,
    CursoAnotacionesComponent,
    CursoNotasVerComponent,
    CursoNotasIngresarComponent,
    CursoAsistenciaVerComponent,
    CursoAsistenciaIngresarComponent,
    CursoAnotacionesVerComponent,
    CursoAnotacionesVerGenComponent,
    CursoAnotacionesIngresarComponent,
    DocumentosComponent,
    InformesComponent,
    CertificadosComponent,
    CitacionesComponent,
    ByTipoEnsenanzaComponent,
    ByGradoComponent,
    ByCursoComponent,
    ByAlumnoComponent,
    PostulacionesComponent,
    CrearPostulacionComponent,
    PostulacionDetailComponent,
    VerPostulacionesComponent,
    PostulacionesAceptadasComponent,
    PostulacionesRechazadasComponent,
    PostulacionesEsperaComponent,
    ModificarPostulacionComponent,
    PostulacionesDashboardComponent,
    FuncionariosComponent,
    CierreAnnoComponent,
    CrearFuncionarioComponent,
    VerFuncionariosComponent,
    FuncionarioDetailComponent,
    EditarFuncionarioComponent,
    FilterCursoProf,
    CalcPromedio,
    TruncateTextPipe,
    AbbreviatePipe,
    FilterTablePipe,
    Select2WidthFixPipe,
    FilterProfByAsign,
    FilterAsignaturas,
    ConfiguracionComponent,
    ConfiguracionDashboardComponent,
    CalendarioAcademicoComponent,
    NotasPonderacionesComponent,
    JornadaComponent,
    CursosComponent,
    ConfiguracionCursosComponent,
    VerProfesoresComponent,
    AsignarProfesorComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    Select2Module,
    Ng2DatetimePickerModule,
    MomentModule,
  ],
  providers: [
    DpaService,
    EtniasService,
    ColegiosService,
    MatriculaService,
    PostulacionesService,
    ApoderadosService,
    CursosService,
    ProfesoresService,
    AsignaturasService,
    NotasService,
    AnotacionesService,
    EstadosCivilesService,
    FuncionariosService,
    AsistenciaService,
    ConfiguracionService,
    CalendarioService,
    ConfigNotasService,
    PlanDeEstudiosService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
