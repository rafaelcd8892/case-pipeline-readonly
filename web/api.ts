// =============================================================================
// API Client — Typed fetch wrappers
// =============================================================================

import type { SearchResult, ClientCaseSummary, ClientUpdate } from "../lib/query/types";

export type { SearchResult, ClientCaseSummary, ProfileSummary, ContractSummary, BoardItemSummary, ClientUpdate } from "../lib/query/types";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const body = (await res.json()) as { data?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.data as T;
}

export async function listClients(): Promise<SearchResult[]> {
  return apiFetch<SearchResult[]>("/api/clients");
}

export async function searchClients(query: string): Promise<SearchResult[]> {
  return apiFetch<SearchResult[]>(`/api/clients/search?q=${encodeURIComponent(query)}`);
}

export async function getClient(localId: string): Promise<ClientCaseSummary> {
  return apiFetch<ClientCaseSummary>(`/api/clients/${encodeURIComponent(localId)}`);
}

export async function fetchClientUpdates(localId: string, limit = 50): Promise<ClientUpdate[]> {
  return apiFetch<ClientUpdate[]>(`/api/clients/${encodeURIComponent(localId)}/updates?limit=${limit}`);
}
