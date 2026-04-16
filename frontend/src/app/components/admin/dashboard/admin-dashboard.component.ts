// ============================================================
// components/admin/dashboard/admin-dashboard.component.ts
// Panel de administración — CRUD de participantes
// ============================================================
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { FormsModule }                          from '@angular/forms';
import { AuthService }                          from '../../../services/auth.service';
import { RegistrationService }                  from '../../../services/registration.service';
import { Participant }                          from '../../../models/participant.model';

type DashView = 'list' | 'edit';

@Component({
  selector:   'app-admin-dashboard',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-brand">
          <span class="sb-icon">🏆</span>
          <div>
            <strong>Triatlón Admin</strong>
            <small>Sucre Sin Límites 2.0</small>
          </div>
        </div>

        <nav class="sidebar-nav">
          <button class="nav-item active">
            👥 Participantes
          </button>
        </nav>

        <div class="sidebar-user">
          <div class="user-info">
            <div class="user-avatar">{{ adminInitial() }}</div>
            <div>
              <strong>{{ auth.currentAdmin()?.nombre || auth.currentAdmin()?.usuario }}</strong>
              <small>Administrador</small>
            </div>
          </div>
          <button class="logout-btn" (click)="logout()">
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="admin-main">
        <!-- Header -->
        <header class="admin-header">
          <div class="header-left">
            <h2>{{ view() === 'edit' ? 'Editar Participante' : 'Participantes Registrados' }}</h2>
            <p>{{ view() === 'edit' ? 'Modifica los datos del participante' : 'Gestión de inscritos al triatlón' }}</p>
          </div>
          @if (view() === 'list') {
            <div class="header-stats">
              <div class="stat-chip">
                <span class="chip-num">{{ total() }}</span>
                <span>Total inscritos</span>
              </div>
            </div>
          }
          @if (view() === 'edit') {
            <button class="btn btn-outline" (click)="cancelEdit()">
              ← Volver
            </button>
          }
        </header>

        <!-- List view -->
        @if (view() === 'list') {
          <!-- Search bar -->
          <div class="search-bar">
            <div class="search-input-wrap">
              <span class="search-icon">🔍</span>
              <input
                id="admin-search"
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                placeholder="Buscar por nombre, ciudad o correo..."
              />
              @if (searchQuery) {
                <button class="clear-btn" (click)="clearSearch()">✕</button>
              }
            </div>
            <button class="btn btn-primary" (click)="loadParticipants()">
              🔄 Recargar
            </button>
          </div>

          <!-- Table -->
          <div class="table-wrap">
            @if (loading()) {
              <div class="table-loading">
                <div class="loading-dots">
                  <span></span><span></span><span></span>
                </div>
                <p>Cargando participantes...</p>
              </div>
            } @else if (participants().length === 0) {
              <div class="table-empty">
                <span>👥</span>
                <p>No hay participantes registrados aún.</p>
              </div>
            } @else {
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Ciudad</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Disciplina</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  @for (p of participants(); track p.id) {
                    <tr>
                      <td class="td-id">{{ p.id }}</td>
                      <td class="td-name">{{ p.nombre }}</td>
                      <td>{{ p.edad }}</td>
                      <td>{{ p.ciudad }}</td>
                      <td>{{ p.telefono }}</td>
                      <td class="td-email">{{ p.correo }}</td>
                      <td>
                        <span class="tipo-badge" [class]="'disc-' + p.disciplina">
                          {{ disciplinaLabels[p.disciplina] }}
                        </span>
                      </td>
                      <td>
                        <span class="cat-badge">
                          {{ categoriaLabels[p.categoria] }}
                        </span>
                      </td>
                      <td class="td-price">{{ p.precio_aplicado | currency:'COP':'symbol':'1.0-0' }}</td>
                      <td class="td-date">{{ p.fecha_inscripcion | date:'dd/MM/yy HH:mm' }}</td>
                      <td class="td-actions">
                        <button class="action-btn edit" (click)="startEdit(p)" title="Editar">✏️</button>
                        <button class="action-btn delete" (click)="confirmDelete(p)" title="Eliminar">🗑️</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>

              <!-- Pagination -->
              @if (total() > pageSize) {
                <div class="pagination">
                  <button class="page-btn" [disabled]="currentPage() === 1" (click)="goPage(currentPage()-1)">
                    ← Anterior
                  </button>
                  <span class="page-info">
                    Página {{ currentPage() }} de {{ totalPages() }}
                  </span>
                  <button class="page-btn" [disabled]="currentPage() >= totalPages()" (click)="goPage(currentPage()+1)">
                    Siguiente →
                  </button>
                </div>
              }
            }
          </div>
        }

        <!-- Edit view -->
        @if (view() === 'edit' && editingParticipant()) {
          <div class="edit-form glass">
            <div class="edit-grid">
              <div class="form-group">
                <label>Nombre completo</label>
                <input [(ngModel)]="editingParticipant()!.nombre" />
              </div>
              <div class="form-group">
                <label>Edad</label>
                <input type="number" [(ngModel)]="editingParticipant()!.edad" min="5" max="100" />
              </div>
              <div class="form-group">
                <label>Ciudad</label>
                <input [(ngModel)]="editingParticipant()!.ciudad" />
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input [(ngModel)]="editingParticipant()!.telefono" />
              </div>
              <div class="form-group">
                <label>Correo</label>
                <input type="email" [(ngModel)]="editingParticipant()!.correo" />
              </div>
              <div class="form-group">
                <label>Disciplina</label>
                <select [(ngModel)]="editingParticipant()!.disciplina">
                  @for (d of disciplinaOptions; track d.value) {
                    <option [value]="d.value">{{ d.label }}</option>
                  }
                </select>
              </div>
              <div class="form-group">
                <label>Categoría</label>
                <select [(ngModel)]="editingParticipant()!.categoria">
                  @for (c of categoriaOptions; track c.value) {
                    <option [value]="c.value">{{ c.label }}</option>
                  }
                </select>
              </div>
            </div>

            @if (editError()) {
              <div class="edit-error">⚠️ {{ editError() }}</div>
            }

            <div class="edit-actions">
              <button class="btn btn-primary" (click)="saveEdit()" [disabled]="saving()">
                @if (saving()) { <span class="spinner-sm"></span> Guardando... }
                @else { 💾 Guardar Cambios }
              </button>
              <button class="btn btn-outline" (click)="cancelEdit()">Cancelar</button>
            </div>
          </div>
        }
      </main>
    </div>

    <!-- Delete confirm modal -->
    @if (deleteTarget()) {
      <div class="modal-overlay" (click)="cancelDelete()">
        <div class="modal glass" (click)="$event.stopPropagation()">
          <div class="modal-icon">⚠️</div>
          <h3>¿Eliminar participante?</h3>
          <p>
            Vas a eliminar a <strong>{{ deleteTarget()!.nombre }}</strong>.
            Esta acción no se puede deshacer.
          </p>
          <div class="modal-actions">
            <button class="btn btn-danger" (click)="doDelete()">🗑️ Eliminar</button>
            <button class="btn btn-outline" (click)="cancelDelete()">Cancelar</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    /* ── Layout ─────────────────────── */
    .admin-layout {
      display: flex;
      min-height: 100vh;
      background: var(--c-bg);
      font-family: var(--font-body);
    }

    /* ── Sidebar ────────────────────── */
    .admin-sidebar {
      width: 260px;
      background: var(--c-surface);
      border-right: 1px solid var(--c-border);
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--c-border);
      margin-bottom: 1.5rem;
    }

    .sb-icon { font-size: 2rem; }

    .sidebar-brand strong {
      display: block;
      font-size: 0.95rem;
      color: var(--c-white);
    }

    .sidebar-brand small {
      font-size: 0.7rem;
      color: var(--c-muted);
    }

    .sidebar-nav { flex: 1; }

    .nav-item {
      width: 100%;
      text-align: left;
      background: rgba(26,107,255,0.12);
      border: 1px solid rgba(26,107,255,0.25);
      border-radius: var(--r-sm);
      padding: 0.8rem 1rem;
      color: var(--c-blue-light);
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }

    .sidebar-user {
      padding-top: 1.5rem;
      border-top: 1px solid var(--c-border);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: var(--g-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
      flex-shrink: 0;
    }

    .user-info strong { display: block; font-size: 0.9rem; color: var(--c-white); }
    .user-info small  { font-size: 0.75rem; color: var(--c-muted); }

    .logout-btn {
      width: 100%;
      background: rgba(255,50,50,0.08);
      border: 1px solid rgba(255,50,50,0.2);
      border-radius: var(--r-sm);
      padding: 0.6rem;
      color: #ff7070;
      font-family: var(--font-body);
      font-size: 0.85rem;
      cursor: pointer;
      transition: all var(--tr-fast);
    }

    .logout-btn:hover { background: rgba(255,50,50,0.15); }

    /* ── Main ───────────────────────── */
    .admin-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    .admin-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      background: var(--c-surface);
      border-bottom: 1px solid var(--c-border);
    }

    .admin-header h2 {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      letter-spacing: 0.04em;
    }

    .admin-header p { font-size: 0.85rem; color: var(--c-muted); }

    .stat-chip {
      background: rgba(26,107,255,0.1);
      border: 1px solid rgba(26,107,255,0.25);
      border-radius: var(--r-md);
      padding: 0.6rem 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chip-num {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-blue-light);
      line-height: 1;
    }

    .stat-chip span:last-child { font-size: 0.7rem; color: var(--c-muted); }

    /* ── Search ─────────────────────── */
    .search-bar {
      display: flex;
      gap: 1rem;
      padding: 1.2rem 2rem;
      background: var(--c-card);
      border-bottom: 1px solid var(--c-border);
      align-items: center;
    }

    .search-input-wrap {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 0.8rem;
      font-size: 1rem;
    }

    .search-input-wrap input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      padding: 0.65rem 2.5rem 0.65rem 2.5rem;
      color: var(--c-white);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: border-color var(--tr-fast);
    }

    .search-input-wrap input:focus { border-color: var(--c-blue); }
    .search-input-wrap input::placeholder { color: var(--c-muted); opacity: 0.5; }

    .clear-btn {
      position: absolute;
      right: 0.8rem;
      background: none;
      border: none;
      color: var(--c-muted);
      cursor: pointer;
      font-size: 0.85rem;
    }

    /* ── Table ──────────────────────── */
    .table-wrap {
      flex: 1;
      overflow-x: auto;
      padding: 1.5rem 2rem;
    }

    .table-loading, .table-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 4rem;
      color: var(--c-muted);
    }

    .table-empty span { font-size: 3rem; }

    .loading-dots { display: flex; gap: 6px; }
    .loading-dots span {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--c-blue);
      animation: dotPulse 1.4s ease-in-out infinite;
    }

    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes dotPulse {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
      40%            { transform: scale(1.2); opacity: 1; }
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }

    .admin-table th {
      text-align: left;
      padding: 0.7rem 0.9rem;
      background: var(--c-card);
      color: var(--c-muted);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid var(--c-border);
      white-space: nowrap;
    }

    .admin-table td {
      padding: 0.75rem 0.9rem;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      color: var(--c-text);
      vertical-align: middle;
    }

    .admin-table tr:hover td { background: rgba(255,255,255,0.02); }

    .td-id    { color: var(--c-muted); width: 40px; }
    .td-name  { font-weight: 600; color: var(--c-white); }
    .td-email { font-size: 0.8rem; color: var(--c-muted); }
    .td-price { font-weight: 600; color: var(--c-green); font-size: 0.82rem; }
    .td-date  { font-size: 0.78rem; color: var(--c-muted); white-space: nowrap; }

    /* Tipo badge */
    .tipo-badge {
      padding: 3px 10px;
      border-radius: 50px;
      font-size: 0.72rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .disc-running  { background: rgba(0,200,83,0.12); color: #4dffa0; }
    .disc-ciclismo { background: rgba(255,107,0,0.12); color: #ff8c38; }
    .disc-natacion { background: rgba(26,107,255,0.15); color: #4d8eff; }

    .cat-badge {
      padding: 3px 10px;
      border-radius: 50px;
      font-size: 0.72rem;
      font-weight: 600;
      white-space: nowrap;
      background: rgba(255,255,255,0.06);
      color: var(--c-text);
    }

    /* Action buttons */
    .td-actions { display: flex; gap: 0.4rem; white-space: nowrap; }

    .action-btn {
      width: 32px; height: 32px;
      border-radius: var(--r-sm);
      border: 1px solid var(--c-border);
      background: rgba(255,255,255,0.04);
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--tr-fast);
    }

    .action-btn.edit:hover   { background: rgba(26,107,255,0.15); border-color: var(--c-blue); }
    .action-btn.delete:hover { background: rgba(255,50,50,0.15); border-color: #ff5050; }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 1.5rem 0;
    }

    .page-btn {
      background: var(--c-card);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      padding: 0.5rem 1rem;
      color: var(--c-text);
      font-family: var(--font-body);
      font-size: 0.88rem;
      cursor: pointer;
      transition: all var(--tr-fast);
    }

    .page-btn:hover:not(:disabled) { border-color: var(--c-blue); color: var(--c-blue-light); }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .page-info { font-size: 0.85rem; color: var(--c-muted); }

    /* ── Edit form ──────────────────── */
    .edit-form {
      margin: 2rem;
      padding: 2rem;
    }

    .edit-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }

    .form-group { display: flex; flex-direction: column; gap: 0.4rem; }

    label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--c-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    input, select {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      padding: 0.7rem 0.9rem;
      color: var(--c-white);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: border-color var(--tr-fast);
    }

    input:focus, select:focus { border-color: var(--c-blue); }
    select option             { background: #131720; }

    .edit-error {
      background: rgba(255,50,50,0.1);
      border: 1px solid rgba(255,50,50,0.3);
      border-radius: var(--r-sm);
      padding: 0.7rem 1rem;
      color: #ff7070;
      font-size: 0.88rem;
      margin-bottom: 1rem;
    }

    .edit-actions {
      display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
    }

    .spinner-sm {
      width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
      vertical-align: middle;
      margin-right: 4px;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Modal ──────────────────────── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(4px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal {
      max-width: 400px;
      width: 100%;
      padding: 2rem;
      text-align: center;
    }

    .modal-icon { font-size: 3rem; margin-bottom: 1rem; }

    .modal h3 {
      font-family: 'Bebas Neue', cursive;
      font-size: 1.8rem;
      color: var(--c-white);
      margin-bottom: 0.7rem;
    }

    .modal p {
      color: var(--c-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .modal p strong { color: var(--c-white); }

    .modal-actions { display: flex; gap: 0.8rem; justify-content: center; }

    .btn-danger {
      background: linear-gradient(135deg, #b91c1c, #ef4444);
      color: #fff;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 50px;
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all var(--tr-fast);
    }

    .btn-danger:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(239,68,68,0.4); }

    /* Responsive */
    @media (max-width: 900px) {
      .admin-sidebar { display: none; }
      .table-wrap    { padding: 1rem; }
      .edit-grid     { grid-template-columns: 1fr; }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  view                = signal<DashView>('list');
  participants        = signal<Participant[]>([]);
  total               = signal(0);
  loading             = signal(true);
  saving              = signal(false);
  editingParticipant  = signal<Participant | null>(null);
  deleteTarget        = signal<Participant | null>(null);
  editError           = signal('');
  currentPage         = signal(1);
  searchQuery         = '';
  pageSize            = 20;
  private searchTimer: any;

  totalPages = computed(() => Math.ceil(this.total() / this.pageSize));

  adminInitial = computed(() => {
    const n = this.auth.currentAdmin()?.nombre || this.auth.currentAdmin()?.usuario || '?';
    return n.charAt(0).toUpperCase();
  });

  disciplinaLabels: Record<string, string> = {
    running:  '🏃 Running',
    ciclismo: '🚴 Ciclismo',
    natacion: '🏊 Natación',
  };

  categoriaLabels: Record<string, string> = {
    elite:      'Elite',
    recreativa: 'Recreativa',
    ninos:      'Niños',
    unica:      'Categoría Única',
  };

  disciplinaOptions = [
    { value: 'running',  label: 'Running' },
    { value: 'ciclismo', label: 'Ciclismo' },
    { value: 'natacion', label: 'Natación' },
  ];

  categoriaOptions = [
    { value: 'elite',      label: 'Elite' },
    { value: 'recreativa', label: 'Recreativa' },
    { value: 'ninos',      label: 'Niños' },
    { value: 'unica',      label: 'Categoría Única' },
  ];

  constructor(
    public  auth:   AuthService,
    private regSvc: RegistrationService,
  ) {}

  ngOnInit() { this.loadParticipants(); }

  loadParticipants() {
    this.loading.set(true);
    this.regSvc.getParticipants(this.currentPage(), this.pageSize, this.searchQuery)
      .subscribe({
        next: res => {
          this.participants.set(res.data);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  onSearch() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.currentPage.set(1);
      this.loadParticipants();
    }, 400);
  }

  clearSearch() {
    this.searchQuery = '';
    this.currentPage.set(1);
    this.loadParticipants();
  }

  goPage(p: number) {
    this.currentPage.set(p);
    this.loadParticipants();
  }

  // ── Edit ─────────────────────────────────────────────────
  startEdit(p: Participant) {
    this.editingParticipant.set({ ...p });
    this.editError.set('');
    this.view.set('edit');
  }

  cancelEdit() {
    this.editingParticipant.set(null);
    this.view.set('list');
  }

  saveEdit() {
    const p = this.editingParticipant();
    if (!p || !p.id) return;
    this.saving.set(true);
    this.editError.set('');

    this.regSvc.updateParticipant(p.id, p).subscribe({
      next: () => {
        this.saving.set(false);
        this.view.set('list');
        this.loadParticipants();
      },
      error: err => {
        this.saving.set(false);
        this.editError.set(err.error?.error || 'Error al guardar');
      }
    });
  }

  // ── Delete ───────────────────────────────────────────────
  confirmDelete(p: Participant) { this.deleteTarget.set(p); }
  cancelDelete()              { this.deleteTarget.set(null); }

  doDelete() {
    const p = this.deleteTarget();
    if (!p?.id) return;
    this.regSvc.deleteParticipant(p.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.loadParticipants();
      },
      error: err => {
        this.deleteTarget.set(null);
        alert(err.error?.error || 'Error al eliminar');
      }
    });
  }

  logout() { this.auth.logout(); }
}
